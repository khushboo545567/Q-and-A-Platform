const db = require("../db.js");

const getProblem = (req, res) => {
  const cat_id = req.query.cat_id;
  const categoryId = cat_id || 4;

  const sql = `
    SELECT 
      q.problem_id, 
      q.prob_description, 
      q.created_at, 
      q.cat_id, 
      COUNT(DISTINCT v.id) AS votes,
      COUNT(DISTINCT s.solution_id) AS solutions 
    FROM  
      problem q 
    LEFT JOIN 
      vote v 
    ON 
      q.problem_id = v.prob_id 
    LEFT JOIN 
      solution s 
    ON 
      q.problem_id = s.prob_id 
    WHERE 
      q.cat_id = ? 
    GROUP BY 
      q.problem_id 
    ORDER BY 
      q.created_at DESC;`; // Add ORDER BY here

  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Can't get problem data" });
    }
    res.status(200).json({ result });
  });
};

module.exports = getProblem;
