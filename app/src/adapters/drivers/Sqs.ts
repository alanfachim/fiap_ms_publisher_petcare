import AWS, { SQS } from 'aws-sdk';
import { Publication } from '../../application/domain/Publication';
import { PublicationService } from '../../application/services/PublicationService';
import { Repository } from '../driven/Repository';

export class SqsActor {

  sqs: any;
  receiveMessageParams = {
    QueueUrl: "https://sqs.sa-east-1.amazonaws.com/469122751664/petcare-feed-post",
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 1
  };

  constructor() {
    AWS.config.update({
      region: 'sa-east-1'
    });

    this.sqs = new SQS({ apiVersion: '2012-11-05' });
    this.run();
  }

  async run() {
    while (true) {
      var data: any;
      await this.sqs.receiveMessage(this.receiveMessageParams).promise().then((dt: any, err: any) => {
        data = dt;
      });


      if (data.Messages) {
        //for each message implements drivens and services
        data!.Messages.forEach(async (message: { Body: any; ReceiptHandle: any; }) => {
          console.log(message.Body); 
          const pub=Publication.fromJson(message.Body);
          console.log(pub);
          var db = new Repository();
          new PublicationService(db).addPublication(pub);
          await this.removeFromQueue(message.ReceiptHandle);
        });
      }
    }
  }

  removeFromQueue(id: any) {
    return this.sqs.deleteMessage({
      QueueUrl: "https://sqs.sa-east-1.amazonaws.com/469122751664/petcare-feed-post",
      ReceiptHandle: id
    }).promise();
  };

}