import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
};

export const connectionHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        console.log(JSON.stringify(event));
        console.log('connection created or disconnected:', connectionId);
        return {
            statusCode: 200,
            headers: HEADERS,
            body: 'Connected or Disconnected TODO.'
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
