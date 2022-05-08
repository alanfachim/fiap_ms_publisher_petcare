"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationService = void 0;
class PublicationService {
    constructor(db) {
        this.db = db;
    }
    //processo para listar os usuários que possuem interesse em uma publicação
    async findRelevantUsers(publication) {
        return this.db.queryRelevantUsers(publication.location, publication.getRadius());
    }
    //processo de buscar as publicações de um usuário
    async getPublications(user) {
        return this.db.queryUserFeed(user);
    }
    //processo de salvar a publicação no feed de um usuário
    async sendPublicationToFeed(publication, user) {
        this.db.saveToFeed(publication, user);
    }
    //processo de publicar um novo post
    async addPublication(publication) {
        const relevantUsersList = await this.findRelevantUsers(publication);
        relevantUsersList.forEach(async (user) => {
            await this.sendPublicationToFeed(publication, user);
        });
        return true;
    }
}
exports.PublicationService = PublicationService;
//# sourceMappingURL=PublicationService.js.map