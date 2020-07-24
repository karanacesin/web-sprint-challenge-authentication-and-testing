const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();

const users = require("../users/usersModel");
const { isValid } = require("./userValidation");

router.post('/register', (req, res) => {
  let creds = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.HASH_ROUNDS || 8;

        const hash = bcryptjs.hashSync(creds.password, rounds);

        creds.password = hash;

        users.add(creds)
            .then(info => {
                const token = makeJwt(info);

                res.status(201).json({ data: info, token });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;


    if (isValid(req.body)) {
        users.findBy({ username: username })
            .then(([user]) => {
                console.log("user", user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ message: "Welcome to our API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function makeJwt(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
      expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
