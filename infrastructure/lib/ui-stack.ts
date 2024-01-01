import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class UIStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

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

        new CfnOutput(this, 'Bucket URL', { value: mathPyramidServerlessBucket.bucketWebsiteUrl });
    }
};