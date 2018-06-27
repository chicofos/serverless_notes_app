
import * as dynamoLib from './libs/dynamo-lib';
import  { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "notes",
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": data.attachment ? data.attachment : null,
        ":content": data.content ? data.content : null
      },
      ReturnValues: "ALL_NEW"
    };
  
    try {
      const result = await dynamoLib.call("update", params);
      callback(null, success({ status: true }));
    } catch (e) {
      callback(null, failure({ status: false }));
      console.log(e);
    }
  }