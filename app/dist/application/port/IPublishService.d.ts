import { Publication } from "../domain/Publication";
import { User } from "../domain/User";
export interface IPublishService {
    addPublication(publication: Publication, user: User): Promise<boolean>;
}
