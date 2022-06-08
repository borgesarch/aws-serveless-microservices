
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export class CourseWatchedDetailsService {
    
    static async findByPersonId(person_id) {

        let params = {
            IndexName : "person_id-index",
            ExpressionAttributeValues: {
              ":v1": person_id
            },
            ExpressionAttributeNames: {
                "#personId": "person_id",
            },
            TableName: 'newbie-course-source-watched-details',
            KeyConditionExpression: "#personId = :v1"
        };
    
        const { Items } = await dynamo.query(params).promise();

        if(Items.length == 0)
            throw { status: 404, message: 'Nenhum persona encontrado!' }
            
        return Items.find(c => this);
    
    }
    

    static async save(person) {
        await dynamo
          .put({
            TableName: "newbie-course-source-watched-details",
            Item: person
          })
          .promise();
        return person;
    }

    
    static async findById(id){
        
        let body; 

        await dynamo.query({
            TableName: "newbie-course-source-watched-details",
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
