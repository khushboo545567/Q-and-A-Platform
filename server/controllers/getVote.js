const db = require("../db.js");
require("../middleware/verfiyUser.js");

const getVote= (req,res)=>{
    const selectedQuestionId = req.params.selectedQuestionId
    const sql = 'SELECT prob_id, COUNT(*) AS count_vote FROM vote WHERE prob_id = ?'
    db.query(sql,[selectedQuestionId],(err,result)=>{
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(result[0])
    })
}

module.exports = getVote;