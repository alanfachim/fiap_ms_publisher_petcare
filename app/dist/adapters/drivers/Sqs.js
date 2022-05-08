"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsActor = void 0;
const aws_sdk_1 = __importStar(require("aws-sdk"));
const Publication_1 = require("../../application/domain/Publication");
const PublicationService_1 = require("../../application/services/PublicationService");
const Repository_1 = require("../driven/Repository");
class SqsActor {
    constructor() {
        this.receiveMessageParams = {
            QueueUrl: "https://sqs.sa-east-1.amazonaws.com/469122751664/petcare-feed-post",
            MaxNumberOfMessages: 10,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 1
        };
        aws_sdk_1.default.config.update({
            region: 'sa-east-1'
        });
        this.sqs = new aws_sdk_1.SQS({ apiVersion: '2012-11-05' });
        this.run();
    }
    async run() {
        while (true) {
            var data;
            await this.sqs.receiveMessage(this.receiveMessageParams).promise().then((dt, err) => {
                data = dt;
            });
            if (data.Messages) {
                //for each message implements drivens and services
                data.Messages.forEach(async (message) => {
                    console.log(message.Body);
                    const pub = Publication_1.Publication.fromJson(message.Body);
                    console.log(pub);
                    var db = new Repository_1.Repository();
                    new PublicationService_1.PublicationService(db).addPublication(pub);
                    await this.removeFromQueue(message.ReceiptHandle);
                });
            }
        }
    }
    removeFromQueue(id) {
        return this.sqs.deleteMessage({
            QueueUrl: "https://sqs.sa-east-1.amazonaws.com/469122751664/petcare-feed-post",
            ReceiptHandle: id
        }).promise();
    }
    ;
}
exports.SqsActor = SqsActor;
//# sourceMappingURL=Sqs.js.map