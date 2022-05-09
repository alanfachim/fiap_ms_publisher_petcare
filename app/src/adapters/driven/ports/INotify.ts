 
export interface INotify {
    notifyBySockLater(email: String, title: String, body: String): Promise<boolean>;
    notifyByPushLater(email: String, title: String, body: String): Promise<boolean>;
    notifyByEmailLater(email: String, title: String, body: String): Promise<boolean>;
    notifyByEmail(email: String, title: String, body: String): Promise<boolean>;
    notifyBySock(email: String, title: String, body: String): Promise<boolean>;
    notifyByPush(email: String, title: String, body: String): Promise<boolean>; 
}