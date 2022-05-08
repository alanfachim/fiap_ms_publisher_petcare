"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Location_1 = require("../../application/domain/Location");
describe('Testa regras da entidade  localização', function () {
    beforeAll(() => {
    });
    it('Testa construção e metodo de cálculo de distancia', async function () {
        const loc1 = new Location_1.Location(1, 1);
        const loc2 = new Location_1.Location(1, 1);
        const distance = loc1.distance(loc2);
        (0, assert_1.equal)(distance, 0, "Id não é igual");
    });
});
//# sourceMappingURL=LocationTest.spec.js.map