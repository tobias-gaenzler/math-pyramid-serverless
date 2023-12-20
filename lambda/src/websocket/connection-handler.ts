import { APIGatewayProxyEvent } from 'aws-lambda';
import { HEADERS } from '../shared/headers';
import { DeleteItemCommand, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';


export const connectionHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId || "";
        const routeKey = event.requestContext.routeKey;
        console.log(`\nPerforming action "${routeKey}" for connection ID ${connectionId}\n`);

        const dynamoDBClient = new DynamoDBClient({ region: "local", endpoint: "http://localhost:3010" });
        if ("$connect" === routeKey) {
            await addConnection(connectionId, dynamoDBClient);
        } else if ("$disconnect" === routeKey) {
            await removeConnection(connectionId, dynamoDBClient);
        } else if ("username" === routeKey) {
            await setUserName(event, connectionId, dynamoDBClient);
        }

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

async function addConnection(connectionId: string, dynamoDBClient: DynamoDBClient) {
    console.log(`\nSaving connection ${connectionId} ...\n`);

    const input = {
        "Item": {
            "connectionid": {
                "S": connectionId
            }
        },
        "TableName": "players"
    };
    const command = new PutItemCommand(input);

    try {
        await dynamoDBClient.send(command);
        console.log("Connection saved.");
    } catch (error) {
        console.error(`Error while saving connection: ${JSON.stringify(error)}`);
        throw error;
    }
}

async function setUserName(event: APIGatewayProxyEvent, connectionId: string, dynamoDBClient: DynamoDBClient) {
    const userName = JSON.parse(event.body!).sender;
    console.log(`\nSetting user name ${userName} for connection ${connectionId} ...\n`);

    const input = {
        "Item": {
            "connectionid": {
                "S": connectionId
            },
            "username": {
                "S": userName
            }
        },
        "TableName": "players"
    };
    const command = new PutItemCommand(input);

    try {
        await dynamoDBClient.send(command);
        console.log("Connection saved.");
    } catch (error) {
        console.error(`Error while setting username: ${JSON.stringify(error)}`);
        throw error;
    }
}

async function removeConnection(connectionId: string, dynamoDBClient: DynamoDBClient) {
    console.log(`\Removing connection ${connectionId} ...\n`);
    const params = {
        "Key": {
            "connectionid": {
                "S": connectionId
            }
        },
        "TableName": "players"
    };
    const command = new DeleteItemCommand(params);
    try {
        await dynamoDBClient.send(command);
        console.log("Connection removed.");
    } catch (error) {
        console.error(`Error while removing connection ${JSON.stringify(error)}`);
        throw error;
    }
}
