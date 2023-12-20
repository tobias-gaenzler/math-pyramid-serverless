import { APIGatewayProxyEvent } from 'aws-lambda';
import { HEADERS } from '../shared/headers';


export const connectionHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        console.log(`\nPerforming action "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`);
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
