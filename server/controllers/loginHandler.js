const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginHandler = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        error: "user not find",
      });
    }

    const user = result[0];
    // console.log(user);

    bcrypt.compare(password, user.password, (err, isMacth) => {
      if (err) {
        return res.status(500).json({ err: "comparision failed" });
      }
      if (!isMacth) {
        return res.status(400).json({ err: "Email or password is incorrect" });
      }
      const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: req.secure || req.headers["x-forwarded-proto"] === "https",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "login successful", token, user:{ id: user.user_id, name: user.name, email: user.email}});
    });
  });
};

module.exports = loginHandler;
