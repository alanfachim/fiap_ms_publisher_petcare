import { Publication } from "../../../application/domain/Publication";
export interface IRepository {
    queryUserFeed(user: String): Promise<any>;
    queryRelevantUsers(location: any, radius: any): PromiseLike<String[]>;
    saveToFeed(publication: Publication, user: String): Promise<any>;
    get(id: string): Promise<any>;
    put(item: any): Promise<any>;
    delete(id: string): Promise<any>;
    query(query: any): Promise<any>;
    scan(params: any): Promise<any>;
}
