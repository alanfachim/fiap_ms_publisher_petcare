import { equal, deepEqual } from 'assert';
import { PublicationService } from '../../application/services/PublicationService';
import { MockRepository } from '../../adapters/driven/MockRepository';
import { Publication } from '../../application/domain/Publication';
import { Location } from '../../application/domain/Location';
import { Assessment } from '../../application/domain/Assessment';
import { User } from '../../application/domain/User';



describe('Testa regras da entidade  localização', function () { 
    beforeAll(() => {  
    });


    it('Testa construção e metodo de cálculo de distancia', async function () {
        const loc1 =  new Location(1, 1);
        const loc2 =  new Location(1, 1);
        const distance= loc1.distance(loc2);
        equal(distance, 0, "Id não é igual");
    });
 
})