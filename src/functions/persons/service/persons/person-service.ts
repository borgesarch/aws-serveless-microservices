
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export class PersonService {
    
    static async findByPersonId(user_id) {

        let params = {
            IndexName : "user_id-index",
            ExpressionAttributeValues: {
              ":v1": user_id
            },
            ExpressionAttributeNames: {
                "#userId": "user_id",
            },
            TableName: 'newbie-persons',
            KeyConditionExpression: "#userId = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items.find((c) => c = this)
    
    }
    
    static async findAll() {
        let params = {
            IndexName : "status-index",
            ExpressionAttributeValues: {
              ":v1": 'ACTIVE'
            },
            ExpressionAttributeNames: {
                "#status": "status",
            },
            TableName: 'newbie-persons',
            KeyConditionExpression: "#status = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items;
    }

    static async save(person) {
        await dynamo
          .put({
            TableName: "newbie-persons",
            Item: person
          })
          .promise();
        return person;
    }
    
    static async deleteById(id) {
        let personFound = await this.findById(id);
        personFound.status = 'DELETED'
        this.save(personFound)
    }
    
    static async findById(id){
        
        let body; 

        await dynamo.query({
            TableName: "newbie-persons",
            KeyConditionExpression: "#id = :id", 
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
            
        }, (error, data) => body = data.Items.find((c) => this)).promise();
        return body;
    }    
};
