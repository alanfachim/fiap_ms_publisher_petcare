
import AWS from "aws-sdk";
import { Assessment } from "../../application/domain/Assessment";
import { Location } from "../../application/domain/Location";
import { Publication } from "../../application/domain/Publication";
import { User } from "../../application/domain/User";
import { IRepository } from "./ports/IRepository";

export class Repository implements IRepository {
    ddbClient = new AWS.DynamoDB.DocumentClient()
    async queryUserFeed(user: String): Promise<any> {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: "cache",
            KeyConditionExpression: "chave = :chave",
            ExpressionAttributeValues: {
                ":chave": `${user}`
            }
        }; 
        return await docClient.query(params).promise().then((data) => data);

    }
    queryRelevantUsers(location: any, radius: any): Promise<String[]> {
        var params = {
            TableName: "users"
        };
        return this.ddbClient.scan(params).promise().then((data) => {
            return data['Items']!.map(user => user.id);
        });
    }
    async saveToFeed(publication: Publication, user: String): Promise<any> {
        var ddbClient = new AWS.DynamoDB.DocumentClient();
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
    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    put(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    query(query: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    scan(params: any): Promise<any> {
        throw new Error("Method not implemented.");
    }


}