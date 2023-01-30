const { unmarshall } = require("@aws-sdk/util-dynamodb");

const { UsersRepository } = require("../repositories");
const { dynamoDbClient } = require("../db");

class UsersService {
  #usersRepository = null;

  constructor() {
    this.#usersRepository = new UsersRepository(dynamoDbClient);
  }

  async create(userToCreate) {
    await this.#usersRepository.create(userToCreate);
    console.log("User created sucessfully!");
  }

  async find() {
    const items = await this.#usersRepository.find();
    const users = items.map((item) => unmarshall(item));

    return users;
  }

  async findOne(id, country) {
    const item = await this.#usersRepository.findOne(id, country);
    const user = unmarshall(item);

    return user;
  }

  async remove(id, country) {
    await this.#usersRepository.remove(id, country);
    console.log("User deleted successfully");
  }

  async update(id, country, attributes){
    await this.#usersRepository.update(id, country, attributes);
    console.log("User updated successfully");
  }
}

module.exports = { UsersService };
