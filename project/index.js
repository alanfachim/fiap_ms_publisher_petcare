// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
//var hash = require('object-hash');
// Set the region 
AWS.config.update({ region: 'sa-east-1' });
// Create the SQS service object
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
var queueURL = "https://sqs.sa-east-1.amazonaws.com/469122751664/petcare-feed-post";

var ddbClient = new AWS.DynamoDB.DocumentClient()
// var Redis = require('ioredis');
// var redis = new Redis('myredis-ro.puuhwp.ng.0001.sae1.cache.amazonaws.com:6379');
// var redisWriter = new Redis('myredis.puuhwp.ng.0001.sae1.cache.amazonaws.com:6379');


var receiveMessageParams = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 1
};

async function findRelevantUsers(element) { 
    var params = {
        TableName: "users"
    };
    return await ddbClient.scan(params).promise().then((data) => {
        return data['Items']
    });
}

// put iten in dynamoDB
var createFeed = async function (new_feed, user) {
    var ddbClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "cache",
        Item: {
            chave: `feed#${user}`,
            classe: "1",
            feed: [new_feed]
        }
    };
    console.log(params);
    return await ddbClient.put(params).promise();
}


async function publishToUsers(element, user) {
    var params = {
        TableName: "cache",
        Key: {
            "chave": `feed#${user}`,
            "classe":"1"
        },
        UpdateExpression: "SET feed = list_append(feed, :newFeed)",
        ExpressionAttributeValues: {
            ":newFeed": [element],
        },
        ReturnValues: "UPDATED_NEW"
    };
    console.log("Updating the item...");
    return await ddbClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            return createFeed(element, user);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}


var receiveMessage = async function () {
    console.log('iniciando recebimento de mensagens');
    while (true) {
        var data;
        await sqs.receiveMessage(receiveMessageParams).promise().then((dt, err) => {
            data = dt;
        });
        if (data.Messages != undefined) {
            await Promise.all(data.Messages.map(element => {
                return findRelevantUsers(element).then((users) => {
                    return Promise.all(users.map(user => {
                        publishToUsers(JSON.parse(element.Body), user['user_id']);
                    }));
                }).then(() => {
                    return removeFromQueue(element['ReceiptHandle']);
                }).catch(err => {
                    console.log(err);
                });

            })).then((values) => {
                console.log(values);
            });
        }

    }
};

var removeFromQueue = function (id) {
    return sqs.deleteMessage({
        QueueUrl: queueURL,
        ReceiptHandle: id
    }).promise();
};
receiveMessage();