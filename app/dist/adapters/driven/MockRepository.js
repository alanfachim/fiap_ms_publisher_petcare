"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRepository = void 0;
const Assessment_1 = require("../../application/domain/Assessment");
const Location_1 = require("../../application/domain/Location");
const User_1 = require("../../application/domain/User");
class MockRepository {
    constructor() {
        this.assessments = [new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
            new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
        ];
        this.userTable = [
            new User_1.User('teste@teste.com', 'https://www.google.com', 'Teste', this.assessments, new Location_1.Location(1, 1)),
            new User_1.User('teste1@teste.com', 'https://www.google.com', 'Teste1', this.assessments, new Location_1.Location(1, 3)),
            new User_1.User('teste2@teste.com', 'https://www.google.com', 'Teste2', this.assessments, new Location_1.Location(1, 4)),
            new User_1.User('teste3@teste.com', 'https://www.google.com', 'Teste3', this.assessments, new Location_1.Location(1, 5)),
            new User_1.User('teste4@teste.com', 'https://www.google.com', 'Teste4', this.assessments, new Location_1.Location(1, 6))
        ];
        this.feedTable = new Map();
    }
    async queryUserFeed(user) {
        return this.feedTable.get(user);
    }
    queryRelevantUsers(location, radius) {
        var aux = this;
        return Promise.resolve("Success").then(function (value) {
            return aux.userTable.filter(user => user.currentLocation.distance(location) <= radius).map(user => user.id);
        });
    }
    async saveToFeed(publication, user) {
        if (this.feedTable.has(user)) {
            this.feedTable.get(user).push(publication);
        }
        else {
            this.feedTable.set(user, [publication]);
        }
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
exports.MockRepository = MockRepository;
//# sourceMappingURL=MockRepository.js.map