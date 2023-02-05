const {
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const uuidV4 = require("uuid").v4;

const { dynamoDbClient } = require("../db/providers")

class UsersRepository {
  #dynamoClient = null;
  #dynamoTableName = "users";

  constructor() {
    this.#dynamoClient = dynamoDbClient;
  }

  async create(userToCreate) {
    userToCreate.id = uuidV4();
    const command = new PutItemCommand({
      TableName: this.#dynamoTableName,
      Item: marshall(userToCreate),
    });

    await this.#dynamoClient.send(command);
  }

  async find() {
    const command = new ScanCommand({
      TableName: this.#dynamoTableName,
    });

    const { Items: users } = await this.#dynamoClient.send(command);

    return users;
  }

  async findOne(id, country) {
    const command = new GetItemCommand({
      TableName: this.#dynamoTableName,
      Key: marshall({ id, country }),
    });

    const { Item: user } = await this.#dynamoClient.send(command);

    return user;
  }

  async update(id, country, attributes) {

    const itemKeys = Object.keys(attributes);
    const command = new UpdateItemCommand({
      TableName: this.#dynamoTableName,
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
    await this.#dynamoClient.send(command);
  }

  async remove(id, country) {
    const command = new DeleteItemCommand({
      TableName: this.#dynamoTableName,
      Key: marshall({ id, country }),
    });
    await this.#dynamoClient.send(command);
  }
}

module.exports = { UsersRepository };
