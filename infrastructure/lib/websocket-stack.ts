import { Stack, StackProps } from 'aws-cdk-lib'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { join } from 'path';
import * as path from 'path';
import { WebSocketLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { WebSocketApi, WebSocketStage } from 'aws-cdk-lib/aws-apigatewayv2';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface WebsocketProps extends StackProps {
    playersTable: Table;
    logLevel: string;
}

export class WebsocketStack extends Stack {

    public webSocketApi: WebSocketApi;

    constructor(scope: Construct, id: string, props?: WebsocketProps) {
        super(scope, id, props);


        // API
        this.webSocketApi = new WebSocketApi(this, 'ServerlessMathPyramidWebsocketApi');
        const devStage = new WebSocketStage(this, 'DEV', {
            webSocketApi: this.webSocketApi,
            stageName: 'DEV',
            autoDeploy: true,
        });

        // Lambda Functions
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                ],
                nodeModules: [
                    '@aws-lambda-powertools/logger',
                    '@aws-lambda-powertools/tracer',
                    'aws-jwt-verify',
                    '@aws-lambda-powertools/metrics'
                ],
            },
            depsLockFilePath: join(__dirname, '../../backend/', 'package-lock.json'),
            environment: {
                PLAYERS_TABLE_NAME: props?.playersTable.tableName!,
                LOG_LEVEL: props?.logLevel!,
                APIGW_ENDPOINT: devStage.url.replace('wss://', 'https://')
            },
            handler: "handler",
            runtime: Runtime.NODEJS_20_X,
            tracing: Tracing.ACTIVE
        }

        const connectHandler = new NodejsFunction(this, 'ConnectHandler', {
            entry: path.join(__dirname, `../../backend/src/websocket/connection-handler.ts`),
            environment: {
                TABLE_NAME: props?.playersTable.tableName!,
                LOG_LEVEL: props?.logLevel!
            },
            ...nodeJsFunctionProps
        });
        props?.playersTable.grantReadWriteData(connectHandler);

        const broadcastHandler = new NodejsFunction(this, 'BroandcastHandler', {
            entry: path.join(__dirname, `../../backend/src/websocket/broadcast-handler.ts`),
            environment: {
                TABLE_NAME: props?.playersTable.tableName!,
                LOG_LEVEL: props?.logLevel!
            },
            ...nodeJsFunctionProps
        });
        props?.playersTable.grantReadData(broadcastHandler);

        const connectionsArns = this.formatArn({
            service: 'execute-api',
            resourceName: `${devStage.stageName}/POST/*`,
            resource: this.webSocketApi.apiId,
        });

        broadcastHandler.addToRolePolicy(
            new PolicyStatement({ actions: ['execute-api:ManageConnections'], resources: [connectionsArns] })
        );

        // API Routes
        this.webSocketApi.addRoute('$connect', {
            integration: new WebSocketLambdaIntegration('ConnectIntegration', connectHandler),
        });
        this.webSocketApi.addRoute('$disconnect', {
            integration: new WebSocketLambdaIntegration('DisconnectIntegration', connectHandler),
        });
        this.webSocketApi.addRoute('username', {
            integration: new WebSocketLambdaIntegration('UsernameIntegration', connectHandler),
        });
        this.webSocketApi.addRoute('start', {
            integration: new WebSocketLambdaIntegration('StartIntegration', broadcastHandler),
        });
        this.webSocketApi.addRoute('message', {
            integration: new WebSocketLambdaIntegration('MessageIntegration', broadcastHandler),
        });
    }
}