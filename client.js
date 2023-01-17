const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const region = "us-east-1";

const client = new DynamoDBClient({
  region,
});

module.exports = { client };
