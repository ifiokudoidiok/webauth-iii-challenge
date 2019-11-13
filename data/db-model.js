const db = require("../data/db-config.js");

module.exports = {
  register,
  login,
  getUsers,
  findById
};

function register(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function login(user) {
  return db("users").where(user);
}

function getUsers() {
  return db("users").select("id", "username", "department");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
