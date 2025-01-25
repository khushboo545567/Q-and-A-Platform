const db = require("../db.js");
const bcrypt = require("bcrypt");

const signupHandler = (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ err: "password can not be hashed" });
    }
    const sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";

    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ err: "Email already exists" });
        }
        console.error("insertion error in the database");
        return res.status(500).json({ err: "database error while insertion" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

module.exports = signupHandler;
