const { BaseRepository } = require("./base/base.repository");

const sqLiteClient = {};

class UsersRepositorySQLite extends BaseRepository{
  #sqLiteClient = null;

  constructor() {
    super();
    this.#sqLiteClient = sqLiteClient;
  }

  async create(userToCreate) {
    console.log("Creating users...");
  }

  async find() {
    console.log("Finding users...");
    return [];
  }

  async findOne(id, country) {
    console.log("Finding an user...");
  }

  async update(id, country, attributes) {
    console.log("Updating an user...");

  }

  async remove(id, country) {
    console.log("Deleting user...");

  }
}
module.exports = { UsersRepositorySQLite };
