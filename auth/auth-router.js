const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const model = require("../data/db-model");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

function register(req, res) {
  const { username, password, department } = req.body;
  const hash = bcrypt.hashSync(password, 11);

  const newUser = {
    username: username,
    department: department,
    password: hash
  };

  model
    .register(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const { username, password } = req.body;
  model
    .login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(
    payload,
    // process.env.NODE_ENV === 'development' ? 'devsecret' : process.env.SECRET,
    "THIS IS THE SECRET",
    options
  );

  return result;
}

module.exports = authRouter;
