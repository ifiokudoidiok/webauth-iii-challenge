const express = require("express");
// const bcrypt = require("bcryptjs");

const model = require("../../data/db-model");
const restricted = require("../../auth/restricted-middleware");

const router = express.Router();

router.get("/users", restricted, showUsers);

function showUsers(req, res) {
  if (req.decodedToken) {
    model
      .getUsers()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.json({
      message: "You don't have the right role to access this information"
    });
  }
}

module.exports = router;
