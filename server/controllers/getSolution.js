const db = require("../db.js");

const getSolution = (req, res) => {
  const prob_id = req.params.selectedQuestionId;
  const sql = 
    `SELECT 
      s.solution_id, 
      s.sol_description, 
      s.created_at AS solution_created_at,
      p.prob_description 
    FROM 
      solution s 
    INNER JOIN  
      problem p 
    ON 
      s.prob_id = p.problem_id 
    WHERE  
      p.problem_id = ?
    ORDER BY 
      s.created_at DESC`; // Add ORDER BY here

  db.query(sql, [prob_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "can't get the solution" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "No solutions found for the given problem ID" });
    }
    res.status(200).json({ success: true, data: result });
  });
};

module.exports = getSolution;
