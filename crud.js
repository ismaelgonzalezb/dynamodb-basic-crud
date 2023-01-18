const {
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
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

// getUserById("1fef818c-1736-48b4-8aea-98fda6473253", "PR");

async function updateUser(id, country, attributes) {
  const itemKeys = Object.keys(attributes);
  const command = new UpdateItemCommand({
    TableName: "users",
    Key: marshall({ id, country }),
    ReturnValues: "ALL_NEW",
    UpdateExpression: `SET ${itemKeys
      .map((k, index) => `#field${index} = :value${index}`)
      .join(", ")}`,
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
      {}
    ),
    ExpressionAttributeValues: marshall(
      itemKeys.reduce(
        (accumulator, k, index) => ({
          ...accumulator,
          [`:value${index}`]: attributes[k],
        }),
        {}
      )
    ),
  });
  const result = await client.send(command);
  console.log(result);
}
updateUser("886f1c37-9635-4ce7-a018-d19bf2b3a449", "PR", {
  email: "luisr@yopmail.com",
});

async function deleteUser(id, country) {
  const command = new DeleteItemCommand({
    TableName: "users",
    Key: marshall({ id, country }),
  });
  await client.send(command);
  console.log("User deleted successfully");
}

// deleteUser("f0d858ba-1e56-4953-a470-3a6eeeccf0cf", "PR");
