
import { INotify } from '../../adapters/driven/ports/INotify';
import { INotifyService } from '../port/INotifyService';

export class NotifyService implements INotifyService {
    constructor(private notifyAdpter: INotify) {
    }

    //processo de notificação de um usuário
    async notify(email: String, title: String, body: String): Promise<boolean> {
        //tenta notificar o usuário caso não seja possível, adicionar tarefa em uma fila de notificação
        try {
            await this.notifyAdpter.notifyByEmail(email, title, body); 
        } catch (error) {
            await this.notifyAdpter.notifyByEmailLater(email, title, body); 
        }
        try {
            await this.notifyAdpter.notifyByPush(email, title, body); 
        } catch (error) {
            await this.notifyAdpter.notifyByPushLater(email, title, body); 
        }
        try {
            await this.notifyAdpter.notifyBySock(email, title, body); 
        } catch (error) {
            await this.notifyAdpter.notifyBySockLater(email, title, body); 
        } 
        return true;
    }

}