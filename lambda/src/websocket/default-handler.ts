import { APIGatewayProxyEvent } from 'aws-lambda';

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
};


export const defaultHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        console.log(`\nDefault Handler received request with route "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`);
        return {
            statusCode: 200,
            headers: HEADERS,
            body: {}
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
