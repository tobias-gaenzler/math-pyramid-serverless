import { APIGatewayProxyEvent } from 'aws-lambda';
import { HEADERS } from '../shared/headers';


export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        console.log(`\nDefault Handler received request with route "${event.requestContext.routeKey}" for connection ID ${connectionId}\n`);
        return {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": HEADERS,
            "body": JSON.stringify({})
        };
    } catch (err) {
        console.error(err);
        return {
            "isBase64Encoded": false,
            "statusCode": 500,
            "headers": HEADERS,
            "body": JSON.stringify({ "message": `"${JSON.stringify(err)}"` })
        };
    }
};
