const {
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const uuidV4 = require("uuid").v4;
const { client } = require("./client");

const user = {
  id: uuidV4(),
  country: "PR",
  name: "Lucas",
  lastName: "Rodriguez",
  email: "lr@yopmail.com",
};

const params = {
  TableName: "users",
  Item: marshall(user),
};

async function createUsers() {
  const command = new PutItemCommand(params);
  const result = await client.send(command);
  console.log(result);
}

// createUsers();

async function getAllUsers() {
  const command = new ScanCommand({
    TableName: "users",
  });

  const { Items } = await client.send(command);
  const result = Items.map((item) => unmarshall(item));
  console.log(result);
}

// getAllUsers();

async function getUserById(id, country) {
  const command = new GetItemCommand({
    TableName: "users",
    Key: marshall({ id, country }),
  });

  const { Item } = await client.send(command);
  const result = unmarshall(Item);
  console.log(result);
}

getUserById("7f7838d3-4626-419a-8894-34f490cbd723", "DR");
