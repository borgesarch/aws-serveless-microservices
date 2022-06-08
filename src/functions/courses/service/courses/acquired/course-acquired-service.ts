
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export class AcquiredCourseService {
    
    
    static async findAll() {
        let params = {
            IndexName : "status-index",
            ExpressionAttributeValues: {
              ":v1": 'ACTIVE'
            },
            ExpressionAttributeNames: {
                "#status": "status",
            },
            TableName: 'newbie-course-acquired',
            KeyConditionExpression: "#status = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items;
    }
    
    static async findByPersonId(person_id) {

        let params = {
            IndexName : "person_id-index",
            ExpressionAttributeValues: {
              ":v1": person_id
            },
            ExpressionAttributeNames: {
                "#personId": "person_id",
            },
            TableName: 'newbie-course-acquired',
            KeyConditionExpression: "#personId = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();
        return Items;
    
    }
    

    static async save(course) {
        await dynamo
          .put({
            TableName: "newbie-course-acquired",
            Item: course
          })
          .promise();
        return course;
    }

    
    static async findById(id){
        
        let body; 

        await dynamo.query({
            TableName: "newbie-course-acquired",
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
}
