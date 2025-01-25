const db = require("../db.js");
require("../middleware/verfiyUser.js");

const postProblem = (req, res) => {
  const { prob_description } = req.body;
  const cat_id = req.params.selectedCategoryId;
  const u_id = req.u_id;

  if (!prob_description) {
    return res.status(400).json({ error: "please ask the question" });
  }

  const sql =
    "INSERT INTO problem (prob_description,u_id,cat_id) VALUES(?,?,?)";

  db.query(sql, [prob_description, u_id, cat_id], (err, result) => {
    if (err) {
      console.error("insertion error in the database");
      return res.status(500).json({
        error: "database error while insertion",
      });
    }
    res.status(201).json({ message: "question added succeffully"});
  });
};

module.exports = postProblem;