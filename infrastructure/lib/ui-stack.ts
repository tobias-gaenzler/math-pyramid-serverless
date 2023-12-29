import { CfnOutput, DockerImage, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsCustomResource } from 'aws-cdk-lib/custom-resources';
import { WebSocketApi } from 'aws-cdk-lib/aws-apigatewayv2';

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


        new BucketDeployment(this, `DeployMathPyramid-${new Date().toISOString()}`, {
            sources: [Source.asset("../ui/build")],
            destinationBucket: mathPyramidServerlessBucket,
            prune: false
        });

        // const appConfig = {
        //     REACT_APP_WS_URL: props?.websocketApi.apiEndpoint
        // };
        // console.log(props?.websocketApi); // TODO: remove

        // new BucketDeployment(this, `DeployMathPyramidConfig-${new Date().toISOString()}`, {
        //     sources: [Source.jsonData('config.json', appConfig)],
        //     destinationBucket: mathPyramidServerlessBucket,
        //     prune: false
        // });

        new CfnOutput(this, 'Bucket URL', { value: mathPyramidServerlessBucket.bucketWebsiteUrl });
    }
};