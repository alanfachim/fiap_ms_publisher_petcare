"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const PublicationService_1 = require("../../application/services/PublicationService");
const MockRepository_1 = require("../../adapters/driven/MockRepository");
const Publication_1 = require("../../application/domain/Publication");
const Location_1 = require("../../application/domain/Location");
const Assessment_1 = require("../../application/domain/Assessment");
const User_1 = require("../../application/domain/User");
describe('Testa serviço de publicação', function () {
    let publicationService;
    let assessments;
    let publication1;
    beforeAll(() => {
        const db = new MockRepository_1.MockRepository();
        publicationService = new PublicationService_1.PublicationService(db);
        assessments = [
            new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
            new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
        ];
        publication1 = new Publication_1.Publication(1234, 1, 'teste', new Date(), 'teste@teste.com.br', 'https://www.google.com/a', new User_1.User('teste@teste.com', 'https://www.google.com/a', 'Teste', assessments, new Location_1.Location(1, 1)), 'teste', new Location_1.Location(1, 1));
    });
    it('Testa publicação de um novo post', async function () {
        (0, assert_1.equal)(true, await publicationService.addPublication(publication1));
    });
    it('Testa consulta de um feed de um usuario', async function () {
        await publicationService.addPublication(publication1);
        const feed = await publicationService.getPublications('teste@teste.com');
        (0, assert_1.deepEqual)([publication1], feed, "Feed não é igual");
    });
});
//# sourceMappingURL=PublicationServiceTest.spec.js.map