exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user1", password: "1234", department: "finance" },
        { username: "user2", password: "1234", department: "finance" },
        { username: "user3", password: "1234", department: "finance" },
        { username: "user4", password: "1234", department: "finance" },
        { username: "user5", password: "1234", department: "finance" },
        { username: "paco", password: "1234", department: "accounts" }
      ]);
    });
};
