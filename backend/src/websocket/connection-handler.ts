import { APIGatewayProxyEvent } from 'aws-lambda';
import { HEADERS } from '../shared/headers';
import { $Command, DeleteItemCommand, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const DYNAMODB_ENDPOINT = process.env.DYNAMODB_URL ?? "http://localhost:3010";
const PLAYERS_TABLE_NAME = process.env.PLAYERS_TABLE_NAME ?? "players";

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId || "";
        const routeKey = event.requestContext.routeKey;
        console.log(`\nPerforming action "${routeKey}" for connection ID ${connectionId} on table ${PLAYERS_TABLE_NAME}\n`);

        const dynamoDBClient = process.env.PLAYERS_TABLE_NAME ?
            new DynamoDBClient({ region: "eu-central-1", apiVersion: "2012-08-10" }) // aws
            : new DynamoDBClient({ region: "local", endpoint: DYNAMODB_ENDPOINT }); // local
        if ("$connect" === routeKey) {
            await addConnection(connectionId, dynamoDBClient);
        } else if ("$disconnect" === routeKey) {
            await removeConnection(connectionId, dynamoDBClient);
        } else if ("username" === routeKey) {
            await setUserName(event, connectionId, dynamoDBClient);
        }

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

async function addConnection(connectionId: string, dynamoDBClient: DynamoDBClient) {
    console.log(`\nSaving connection ${connectionId} ...\n`);

    const input = {
        "Item": {
            "connectionid": {
                "S": connectionId
            }
        },
        "TableName": PLAYERS_TABLE_NAME
    };
    const command = new PutItemCommand(input);
    await sendCommand(dynamoDBClient, command, "Connection saved.", "Error while saving connection");
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
        "TableName": PLAYERS_TABLE_NAME
    };
    const command = new PutItemCommand(input);
    await sendCommand(dynamoDBClient, command, "Setting user name.", "Error while setting username");
}

async function removeConnection(connectionId: string, dynamoDBClient: DynamoDBClient) {
    console.log(`\Removing connection ${connectionId} ...\n`);
    const params = {
        "Key": {
            "connectionid": {
                "S": connectionId
            }
        },
        "TableName": PLAYERS_TABLE_NAME
    };
    const command = new DeleteItemCommand(params);
    await sendCommand(dynamoDBClient, command, "Connection removed.", "Error while removing connection");
}

async function sendCommand(
    dynamoDBClient: DynamoDBClient,
    command: $Command<any, any, any, any, any>,
    successMessage: string,
    errorMessage: string) {
    try {
        await dynamoDBClient.send(command);
        console.log(successMessage);
    } catch (error) {
        console.error(errorMessage, JSON.stringify(error));
        throw error;
    }
}

