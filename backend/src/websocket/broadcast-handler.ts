import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { AttributeValue, DeleteItemCommand, DynamoDBClient, ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { HEADERS } from '../shared/headers';
import { MathPyramidFactory } from '../math-pyramid/math-pyramid-factory';

const DYNAMODB_ENDPOINT = process.env.DYNAMODB_URL ?? "http://localhost:3010";
const PLAYERS_TABLE_NAME = process.env.PLAYERS_TABLE_NAME ?? "players";
const APIGW_ENDPOINT = process.env.APIGW_ENDPOINT ?? "ws://localhost:3002";

const factory: MathPyramidFactory = new MathPyramidFactory();

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const userName = JSON.parse(event.body!).sender
        const routeKey = event.requestContext.routeKey;

        console.log(`\nPerforming action "${routeKey}" from ${userName}/${connectionId}\n`);
        console.log(`Event: ${JSON.stringify(event)}`);

        const dynamoDBClient = process.env.PLAYERS_TABLE_NAME ?
            new DynamoDBClient({ region: "eu-central-1", apiVersion: "2012-08-10" }) // aws
            : new DynamoDBClient({ region: "local", endpoint: DYNAMODB_ENDPOINT }); // local

        const connections = await getConnections(dynamoDBClient);
        console.log(`Endpoint from request: ${event.requestContext.domainName}/${event.requestContext.stage}`);
        console.log(`Endpoint from environment: ${APIGW_ENDPOINT}`);
        const apiGatewayManagementApi = new ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: APIGW_ENDPOINT
        });

        var message = "";
        if ("start" === routeKey) {
            message = getNewGameMessage(event);
        } else {
            message = event.body || "";
        }

        await Promise.all((connections.Items ?? []).map(async (connection: Record<string, AttributeValue>) => {
            console.log(`Sending message ${message} to connection ${JSON.stringify(connection)}`);

            const connectionId = connection.connectionid.S!;
            const userName = connection.username ? connection.username.S : "unknown";
            await apiGatewayManagementApi.postToConnection({ "ConnectionId": connectionId, "Data": message, })
                .then(() => {
                    console.log(`Message sent to ${userName}/${connectionId}`);
                })
                .catch((err: any) => {
                    console.error(`Error when sending message to ${userName}/${connectionId}: ${JSON.stringify(err)}`);
                    if (err.name === "410") { // TODO: check if this works when deployed
                        console.log(`Found stale connection, deleting ${connectionId}`);
                        dynamoDBClient.send(new DeleteItemCommand({
                            "Key": {
                                "connectionid": {
                                    "S": connectionId
                                }
                            },
                            "TableName": PLAYERS_TABLE_NAME
                        }));
                    }
                });
        }));

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


function getNewGameMessage(event: APIGatewayProxyEvent): string {
    const body = JSON.parse(event.body!);
    const size: number = parseInt(body.data.size);
    const maxValue: number = parseInt(body.data.maxValue);
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

async function getConnections(dynamoDBClient: DynamoDBClient): Promise<ScanCommandOutput> {
    console.log('Retrieving active connections...');
    const params = { "TableName": PLAYERS_TABLE_NAME };
    const command = new ScanCommand(params);
    return await dynamoDBClient.send(command);
}
