import { equal, deepEqual } from 'assert';
import { PublicationService } from '../../application/services/PublicationService';
import { MockRepository } from '../../adapters/driven/MockRepository';
import { Publication } from '../../application/domain/Publication';
import { Location } from '../../application/domain/Location';
import { Assessment } from '../../application/domain/Assessment';
import { User } from '../../application/domain/User';



describe('Testa regras da entidade  publicação', function () {
    let assessments: Assessment[];
    beforeAll(() => { 
        assessments = [
            new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
            new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
        ];
    });


    it('Testa construção da entidade', async function () {
        const user =   new User('teste@teste.com', 'https://www.google.com/a', 'Teste', assessments, new Location(1, 1));
        equal(user.id, 'teste@teste.com', "Id não é igual");
    });
 
})