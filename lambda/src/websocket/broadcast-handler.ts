import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { AttributeValue, DeleteItemCommand, DynamoDBClient, ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { HEADERS } from '../shared/headers';
import { BroadcastMessage } from '../shared/broadcast-message';


type MathPyramidModelData = {
    size: number;
    solutionValues: number[];
    startValues: number[];
}

type MathPyramidMessage = {
    action: string | undefined;
    data: MathPyramidModelData | undefined;
}

export const broadcastHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const senderId = event.requestContext.connectionId;
        console.log(`\nPerforming action "${event.requestContext.routeKey}" for connection ID ${senderId}\n`);

        const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1", endpoint: "http://localhost:3010" }); // TODO: use correct region and url (env)

        const data = await getConnections(dynamoDBClient);

        const apiGatewayManagementApi = new ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            // TODO: env variable and check which URL is required when deployed (e.g. http://${domain}:3002/${stage})
            endpoint: `ws://${event.requestContext.domainName}:3002`,
        });

        const message = getMessage(event);
        await Promise.all(data.Items!.map(async (connection: Record<string, AttributeValue>) => {
            await sendMessageToConnection(message, connection, apiGatewayManagementApi, dynamoDBClient);
        }));

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


function getMessage(event: APIGatewayProxyEvent): string {
    const input = event.body;
    if (isBroadcastMessage(input || "")) {
        return input!;
    } else {
        const message = JSON.parse(input!) as MathPyramidMessage;
        return JSON.stringify(message.data);
    }
}

function isBroadcastMessage(jsonMessage: string): boolean {
    const message = JSON.parse(jsonMessage) as BroadcastMessage;
    return (message.message !== null && message.message !== undefined);
}

async function sendMessageToConnection(
    message: string,
    connection: Record<string, AttributeValue>,
    apiGatewayManagementApi: ApiGatewayManagementApi,
    dynamoDBClient: DynamoDBClient
) {
    const connectionId = connection.connectionid.S!;
    await apiGatewayManagementApi.postToConnection({ "ConnectionId": connectionId, "Data": message, })
        .then(() => {
            console.log(`Message sent to connection ${connectionId}`);
        })
        .catch((err: any) => {
            if (err.name === "410") { // TODO: check if this works when deployed
                console.log(`Found stale connection, deleting ${connectionId}`);
                dynamoDBClient.send(new DeleteItemCommand({
                    "Key": {
                        "connectionid": {
                            "S": connectionId
                        }
                    },
                    "TableName": "players"
                }));
            }
        });
}

async function getConnections(dynamoDBClient: DynamoDBClient): Promise<ScanCommandOutput> {
    console.log('Retrieving active connections...');
    const params = { "TableName": "players" };
    const command = new ScanCommand(params);
    return await dynamoDBClient.send(command);
}
