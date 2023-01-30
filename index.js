const {UsersService} = require('./services');

class Main {
  #usersServices = null;

  constructor() {
    this.#usersServices = new UsersService();
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

main.remove("06841d03-1b48-4ab3-bda9-f78d55a25928", "IT");