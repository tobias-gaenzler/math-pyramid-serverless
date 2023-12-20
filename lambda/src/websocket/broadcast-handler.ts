import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { AttributeValue, DeleteItemCommand, DynamoDBClient, ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { HEADERS } from '../shared/headers';
import { MathPyramidFactory } from '../math-pyramid/math-pyramid-factory';


const factory: MathPyramidFactory = new MathPyramidFactory();

export const broadcastHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const userName = JSON.parse(event.body!).sender
        const routeKey = event.requestContext.routeKey;

        console.log(`\nPerforming action "${routeKey}" from ${userName}/${connectionId}\n`);

        const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1", endpoint: "http://localhost:3010" }); // TODO: use correct region and url (env)

        const connections = await getConnections(dynamoDBClient);

        const apiGatewayManagementApi = new ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            // TODO: env variable and check which URL is required when deployed (e.g. http://${domain}:3002/${stage})
            endpoint: `ws://${event.requestContext.domainName}:3002`,
        });

        var message = "";
        if ("start" === routeKey) {
            message = getNewGameMessage(event);
        } else {
            message = getBroadcastMessage(event);
        }

        await Promise.all(connections.Items!.map(async (connection: Record<string, AttributeValue>) => {
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


function getNewGameMessage(event: APIGatewayProxyEvent): string {
    const body = JSON.parse(event.body!);
    const size = body.data.size;
    const maxValue = JSON.parse(event.body!).data.maxValue;
    const solutionValues: number[] = factory.createRandomSolution(size, maxValue);
    const startValues: number[] = factory.getUniquelySolvableRandomStartValues(solutionValues);

    console.log(`Start values: ${JSON.stringify(startValues)}`);
    console.log(`Solution values: ${JSON.stringify(solutionValues)}`);
    return JSON.stringify({
        size: size,
        startValues: startValues,
        solutionValues: solutionValues,
    });
}

function getBroadcastMessage(event: APIGatewayProxyEvent): string {
    return event.body || "";
}

async function sendMessageToConnection(
    message: string,
    connection: Record<string, AttributeValue>,
    apiGatewayManagementApi: ApiGatewayManagementApi,
    dynamoDBClient: DynamoDBClient
) {
    const connectionId = connection.connectionid.S!;
    const userName = connection.username.S!;
    await apiGatewayManagementApi.postToConnection({ "ConnectionId": connectionId, "Data": message, })
        .then(() => {
            console.log(`Message sent to ${userName}/${connectionId}`);
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
