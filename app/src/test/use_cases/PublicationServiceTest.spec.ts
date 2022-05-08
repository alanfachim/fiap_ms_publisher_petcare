import { equal, deepEqual } from 'assert';
import { PublicationService } from '../../application/services/PublicationService';
import { MockRepository } from '../../adapters/driven/MockRepository';
import { Publication } from '../../application/domain/Publication';
import { Location } from '../../application/domain/Location';
import { Assessment } from '../../application/domain/Assessment';
import { User } from '../../application/domain/User';



describe('Testa serviço de publicação', function () {
    let publicationService: PublicationService;
    let assessments: Assessment[];
    let publication1: Publication;
    beforeAll(() => {
        const db = new MockRepository();
        publicationService = new PublicationService(db);
        assessments = [
            new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
            new Assessment('teste2@teste.com', 'Teste2', 'teste teste', new Date(), 4.5),
        ];
        publication1 = new Publication(1234, 1, 'teste', new Date(),
            'teste@teste.com.br', 'https://www.google.com/a', new User('teste@teste.com', 'https://www.google.com/a', 'Teste', assessments, new Location(1, 1)), 'teste', new Location(1, 1));
    });


    it('Testa publicação de um novo post', async function () {
        equal(true, await publicationService.addPublication(publication1));
    });

    it('Testa consulta de um feed de um usuario', async function () {
        await publicationService.addPublication(publication1);
        const feed = await publicationService.getPublications('teste@teste.com');
        deepEqual([publication1], feed, "Feed não é igual");
    });
})