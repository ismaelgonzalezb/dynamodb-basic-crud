const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("./client");

const params = {
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
    {
      AttributeName: "country",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    },
    {
      AttributeName: "country",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "users",
  StreamSpecification: {
    StreamEnabled: false,
  },
};

async function run() {
  try {
    const command = new CreateTableCommand(params);
    const result = await client.send(command);

    console.log(result);
  } catch (ex) {
    console.log(ex);
  }
}

run();
