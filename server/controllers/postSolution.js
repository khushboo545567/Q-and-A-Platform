const db = require("../db.js");
require("../middleware/verfiyUser.js");

const postSolution = (req, res) => {
  const { sol_description } = req.body;
  const u_id = req.u_id;
  const cat_id = req.params.selectedCategoryId;
  const prob_id = req.params.selectedQuestionId;
  if (!sol_description) {
    return res.status(400).json({ error: "please give the solution" });
  }
  const sql =
    "INSERT INTO solution (sol_description,u_id,cat_id,prob_id) values(?, ?, ?, ?)";
  db.query(sql, [sol_description, u_id, cat_id, prob_id], (err, result) => {
    if (err) {
      console.error("insertion error in the database");
      res
        .status(500)
        .json({ error: "database error while insertion in the database" });
    }
    res.status(201).json({ message: "solution added successfully"});
  });
};

module.exports = postSolution;