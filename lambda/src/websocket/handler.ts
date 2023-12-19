import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
};


type MathPyramidModelData = {
    size: number;
    solutionValues: number[];
    startValues: number[];
}

class MathPyramidMessage {
    action: string | undefined;
    data: MathPyramidModelData | undefined;
}

export const connectionHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const message = `\nPerforming action "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`;
        console.log(message);
        return {
            statusCode: 200,
            headers: HEADERS,
            body: message
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: `{ "message": "${err}" }`
        };
    }
};

export const defaultHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const message = `\nDefault Handler received request with route "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`;
        console.log(message);
        return {
            statusCode: 200,
            headers: HEADERS,
            body: message
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: `{ "message": "${err}" }`
        };
    }
};

export const startHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const message = `\nPerforming action "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`;
        console.log(message);
        const domain = event.requestContext.domainName;
        //const stage = event.requestContext.stage;
        //const callbackUrlForAWS = `http://${domain}:3002/${stage}`;
        const callbackUrlForAWS = `ws://${domain}:3002`;
        await sendMessageToClient(callbackUrlForAWS, connectionId, Object.assign(new MathPyramidMessage(), JSON.parse(event.body!)));
        return {
            statusCode: 200,
            headers: HEADERS,
            body: message
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: `{ "message": "${err}" }`
        };
    }
};

function sendMessageToClient(url: string, connectionId: string | undefined, payload: MathPyramidMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        const apigatewaymanagementapi = new ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: url,
        });
        apigatewaymanagementapi.postToConnection(
            {
                ConnectionId: connectionId, // connectionId of the receiving ws-client
                Data: JSON.stringify(payload.data),
            },
            (err, data) => {
                if (err) {
                    console.log('err is', err);
                    reject(err);
                }
                resolve(data);
            }
        );
    });
}

