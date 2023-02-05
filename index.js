const { UsersRepository, UsersRepositorySQLite } = require("./repositories");
const {UsersService} = require('./services');

class Main {
  #usersServices = null;

  constructor() {
    // const usersRepositoryDynamo = new UsersRepository();
    const usersRepositorySQLite = new UsersRepositorySQLite();
    this.#usersServices = new UsersService(usersRepositorySQLite);
  }

  async create(userToCreate) {
    await this.#usersServices.create(userToCreate);
  }

  async find() {
    const users = await this.#usersServices.find();
    console.log(users);
  }

  async findOne(id, country) {
    const user = await this.#usersServices.findOne(id, country);
    console.log(user);
  }

  async update(id, country, attributes){
    await this.#usersServices.update(id, country, attributes);
  }

  async remove(id, country) {
    await this.#usersServices.remove(id, country);
  }
}

const main = new Main();

main.find();