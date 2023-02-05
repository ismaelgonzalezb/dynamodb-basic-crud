const { UsersRepository } = require("./users.repository");
const { UsersRepositorySQLite } = require("./users-sqlite.repository");

module.exports = { UsersRepository, UsersRepositorySQLite };