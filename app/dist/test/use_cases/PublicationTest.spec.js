"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Publication_1 = require("../../application/domain/Publication");
const Location_1 = require("../../application/domain/Location");
const Assessment_1 = require("../../application/domain/Assessment");
const User_1 = require("../../application/domain/User");
describe('Testa regras da entidade  publicação', function () {
    let assessments;
    beforeAll(() => {
        assessments = [
            new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
            new Assessment_1.Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
        ];
    });
    it('Testa construção da entidade', async function () {
        const publication = new Publication_1.Publication(1234, 1, 'teste', new Date(), 'teste@teste.com', 'https://www.google.com/a', new User_1.User('teste@teste.com', 'https://www.google.com/a', 'Teste', assessments, new Location_1.Location(1, 1)), 'teste', new Location_1.Location(1, 1));
        (0, assert_1.equal)(publication.id, 'teste@teste.com', "Id não é igual");
    });
});
//# sourceMappingURL=PublicationTest.spec.js.map