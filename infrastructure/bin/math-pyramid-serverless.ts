#!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebsocketStack } from '../lib/websocket-stack';
import { DatabaseStack } from '../lib/database-stack';
import { UIStack } from '../lib/ui-stack';

/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */

/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
const app = new cdk.App();

// Sets the log level for the lambda functions
// Allowed values:
// DEBUG | INFO | WARN | ERROR
const LOG_LEVEL = "INFO";

const databaseStack = new DatabaseStack(app, 'DatabaseStack', {});

const websocketApiStack = new WebsocketStack(app, 'WebsocketStack', {
    logLevel: LOG_LEVEL,
    playersTable: databaseStack.playersTable
});
websocketApiStack.addDependency(databaseStack);

new UIStack(app, 'UIStack');
