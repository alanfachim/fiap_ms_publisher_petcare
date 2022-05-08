import { IRepository } from '../../adapters/driven/ports/IRepository';
import { Publication } from '../domain/Publication';
import { IPublishService } from '../port/IPublishService';
export declare class PublicationService implements IPublishService {
    private db;
    constructor(db: IRepository);
    private findRelevantUsers;
    getPublications(user: String): Promise<any>;
    sendPublicationToFeed(publication: Publication, user: String): Promise<void>;
    addPublication(publication: Publication): Promise<boolean>;
}
