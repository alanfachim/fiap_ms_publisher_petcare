 
import { INotify } from '../../adapters/driven/ports/INotify';
import { IRepository } from '../../adapters/driven/ports/IRepository';
import { Publication } from '../domain/Publication';
import { INotifyService } from '../port/INotifyService';
import { IPublishService } from '../port/IPublishService';

export class PublicationService implements IPublishService {
    constructor(private db: IRepository, private svcnotify: INotifyService) { 
    }

    //processo para listar os usuários que possuem interesse em uma publicação
    private async findRelevantUsers(publication: Publication): Promise<String[]> {
        return  this.db.queryRelevantUsers(publication.location, publication.getRadius());
    }

    //processo de buscar as publicações de um usuário
    async getPublications(user: String) {
        return this.db.queryUserFeed(user);
    }

    //processo de salvar a publicação no feed de um usuário
    async sendPublicationToFeed(publication: Publication, user: String) {
        this.db.saveToFeed(publication, user);
    }

    //processo de publicar um novo post
    async addPublication(publication: Publication) {
        const relevantUsersList = await this.findRelevantUsers(publication);
        relevantUsersList.forEach(async (user) => {
            await this.sendPublicationToFeed(publication, user);
            await this.svcnotify.notify(user, 'Nova plublicação de seu interesse', publication.description); 
        });
        return true;
    }
}