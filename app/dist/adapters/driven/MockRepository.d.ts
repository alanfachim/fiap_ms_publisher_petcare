import { Assessment } from "../../application/domain/Assessment";
import { Publication } from "../../application/domain/Publication";
import { User } from "../../application/domain/User";
import { IRepository } from "./ports/IRepository";
export declare class MockRepository implements IRepository {
    assessments: Assessment[];
    userTable: User[];
    feedTable: Map<String, Publication[]>;
    queryUserFeed(user: String): Promise<any>;
    queryRelevantUsers(location: any, radius: any): Promise<String[]>;
    saveToFeed(publication: Publication, user: String): Promise<void>;
    get(id: string): Promise<any>;
    put(item: any): Promise<any>;
    delete(id: string): Promise<any>;
    query(query: any): Promise<any>;
    scan(params: any): Promise<any>;
}
