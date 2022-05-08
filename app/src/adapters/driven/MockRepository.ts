
import { Assessment } from "../../application/domain/Assessment";
import { Location } from "../../application/domain/Location";
import { Publication } from "../../application/domain/Publication";
import { User } from "../../application/domain/User";
import { IRepository } from "./ports/IRepository";

export class MockRepository implements IRepository {

    assessments = [new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
    new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
    ]

    userTable: User[] = [
        new User('teste@teste.com', 'https://www.google.com', 'Teste', this.assessments, new Location(1, 1)),
        new User('teste1@teste.com', 'https://www.google.com', 'Teste1', this.assessments, new Location(1, 3)),
        new User('teste2@teste.com', 'https://www.google.com', 'Teste2', this.assessments, new Location(1, 4)),
        new User('teste3@teste.com', 'https://www.google.com', 'Teste3', this.assessments, new Location(1, 5)),
        new User('teste4@teste.com', 'https://www.google.com', 'Teste4', this.assessments, new Location(1, 6))
    ];
    feedTable: Map<String, Publication[]> = new Map<String, Publication[]>();



    async queryUserFeed(user: String): Promise<any> {
        return this.feedTable.get(user)
    }
    queryRelevantUsers(location: any, radius: any): Promise<String[]> {
        var aux= this;
        return Promise.resolve("Success").then(function(value) {  
            return aux.userTable.filter(user => user.currentLocation.distance(location) <= radius).map(user => user.id); 
        })
    }
    async saveToFeed(publication: Publication, user: String): Promise<void> {
        if (this.feedTable.has(user)) {
            this.feedTable.get(user)!.push(publication);
        } else {
            this.feedTable.set(user, [publication]);
        }
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