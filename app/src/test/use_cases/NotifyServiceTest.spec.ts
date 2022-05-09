import { equal, deepEqual } from 'assert';
import { PublicationService } from '../../application/services/PublicationService';
import { MockRepository } from '../../adapters/driven/MockRepository';
import { Publication } from '../../application/domain/Publication';
import { Location } from '../../application/domain/Location';
import { Assessment } from '../../application/domain/Assessment';
import { User } from '../../application/domain/User';
import { MockNotify } from '../../adapters/driven/MockNotify';
import { NotifyService } from '../../application/services/NotifyService';



describe('Testa serviço de publicação', function () {
    let svcnotify: NotifyService; 
    beforeAll(() => { 
        const notify = new MockNotify();
          svcnotify = new NotifyService(notify); 
    });


    it('Testa serviço de notificação', async function () {
        equal(true, await svcnotify.notify('teste@teste.com','Teste','teste'));
    });
 
})