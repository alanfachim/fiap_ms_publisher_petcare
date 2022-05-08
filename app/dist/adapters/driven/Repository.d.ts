import AWS from "aws-sdk";
import { Publication } from "../../application/domain/Publication";
import { IRepository } from "./ports/IRepository";
export declare class Repository implements IRepository {
    ddbClient: AWS.DynamoDB.DocumentClient;
    queryUserFeed(user: String): Promise<any>;
    queryRelevantUsers(location: any, radius: any): Promise<String[]>;
    saveToFeed(publication: Publication, user: String): Promise<any>;
    get(id: string): Promise<any>;
    put(item: any): Promise<any>;
    delete(id: string): Promise<any>;
    query(query: any): Promise<any>;
    scan(params: any): Promise<any>;
}
