"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class Repository {
    constructor() {
        this.ddbClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
    }
    async queryUserFeed(user) {
        var docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
        var params = {
            TableName: "cache",
            KeyConditionExpression: "chave = :chave",
            ExpressionAttributeValues: {
                ":chave": `${user}`
            }
        };
        return await docClient.query(params).promise().then((data) => data);
    }
    queryRelevantUsers(location, radius) {
        var params = {
            TableName: "users"
        };
        return this.ddbClient.scan(params).promise().then((data) => {
            return data['Items'].map(user => user.id);
        });
    }
    async saveToFeed(publication, user) {
        var ddbClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
        var params = {
            TableName: "cache",
            Item: {
                chave: `feed#${user}`,
                classe: "1",
                feed: [publication]
            }
        };
        console.log(params);
        return await ddbClient.put(params).promise();
    }
    get(id) {
        throw new Error("Method not implemented.");
    }
    put(item) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    query(query) {
        throw new Error("Method not implemented.");
    }
    scan(params) {
        throw new Error("Method not implemented.");
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map