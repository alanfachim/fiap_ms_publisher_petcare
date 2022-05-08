export declare class SqsActor {
    sqs: any;
    receiveMessageParams: {
        QueueUrl: string;
        MaxNumberOfMessages: number;
        VisibilityTimeout: number;
        WaitTimeSeconds: number;
    };
    constructor();
    run(): Promise<void>;
    removeFromQueue(id: any): any;
}
