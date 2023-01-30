const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const region = "us-east-1";

const dynamoDbClient = new DynamoDBClient({
  region,
});

module.exports = { dynamoDbClient };
