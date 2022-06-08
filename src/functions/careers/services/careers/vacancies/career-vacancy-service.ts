
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export class CareerVacancyService {
    
    static async findByPersonId(person_id) {

        let params = {
            IndexName : "person_id-index",
            ExpressionAttributeValues: {
              ":v1": person_id
            },
            ExpressionAttributeNames: {
                "#personId": "person_id",
            },
            TableName: 'newbie-career-vacancies',
            KeyConditionExpression: "#personId = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items
    
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
            TableName: 'newbie-career-vacancies',
            KeyConditionExpression: "#status = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items;
    }

    static async save(person) {
        await dynamo
          .put({
            TableName: "newbie-career-vacancies",
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
            TableName: "newbie-career-vacancies",
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
