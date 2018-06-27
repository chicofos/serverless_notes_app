import * as dynamoLib from './libs/dynamo-lib';
import  { success, failure } from './libs/response-lib';

export async function main(event, context, callback){
    const params = {
        TableName : "notes",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues : {
            ":userId" : event.requestContext.identity.cognitoIdentityId
        }
    };

    try{
        const result = await dynamoLib.call("query", params);
        callback(null, success(result.Items));
    } catch(e){
        callback(nul, failure({status: false}));
    }
}