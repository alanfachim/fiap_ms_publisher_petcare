 
export interface INotifyService {
     notify(email: String, title: String, body: String): Promise<boolean>; 
}