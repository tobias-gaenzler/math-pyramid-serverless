import { CfnOutput, DockerImage, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { WebSocketApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { execSync, ExecSyncOptions } from 'child_process';
import { copySync } from 'fs-extra';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';

export interface UIProps extends StackProps {
    websocketApi: WebSocketApi
}

export class UIStack extends Stack {
    constructor(scope: Construct, id: string, props?: UIProps) {
        super(scope, id, props);

        const mathPyramidServerlessBucket = new s3.Bucket(this, 'MathPyramidServerlessBucket', {
            bucketName: "math-pyramid-serverless",
            publicReadAccess: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
            blockPublicAccess: {
                blockPublicAcls: false,
                blockPublicPolicy: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false
            },
            removalPolicy: RemovalPolicy.DESTROY,
            accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            autoDeleteObjects: true,
            websiteIndexDocument: "index.html"
        });

        const execOptions: ExecSyncOptions = { stdio: 'inherit' };

        new BucketDeployment(this, `DeployMathPyramid-${new Date().toISOString()}`, {
            sources: [Source.asset("../ui/build", {
                bundling: {
                    command: [
                        'sh',
                        '-c',
                        'echo "Docker build not supported. Please install esbuild."',
                    ],
                    image: DockerImage.fromRegistry('alpine'),
                    local: {
                        tryBundle(outputDir: string) {
                            try {
                                execSync('npm --version', execOptions);
                            } catch {
                                return false;
                            }
                            execSync(
                                `cd ../ui && pwd && npm run build`,
                                execOptions
                            );
                            copySync('../ui/build', outputDir);

                            return true;
                        },
                    },
                },
            })],
            destinationBucket: mathPyramidServerlessBucket,
            prune: false,
            exclude: ['env.js']
        });


        new AwsCustomResource(this, 'ConfigFrontEnd', {
            installLatestAwsSdk: false,
            onUpdate: {
                service: 'S3',
                action: 'putObject',
                parameters: {
                    Body: `window.REACT_APP_WS_URL="${props?.websocketApi.apiEndpoint}/DEV";\nwindow.REACT_APP_DEFAULT_SIZE="3";\nwindow.REACT_APP_MAX_VALUE="100";`,
                    Bucket: mathPyramidServerlessBucket.bucketName,
                    Key: 'env.js',
                },
                physicalResourceId: PhysicalResourceId.of(
                    Date.now().toString(),
                ),
            },
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: AwsCustomResourcePolicy.ANY_RESOURCE,
            }),
        });

        new CfnOutput(this, 'Bucket URL', { value: mathPyramidServerlessBucket.bucketWebsiteUrl });
        new CfnOutput(this, 'API Endpoint', { value: props?.websocketApi.apiEndpoint! });
    }
};