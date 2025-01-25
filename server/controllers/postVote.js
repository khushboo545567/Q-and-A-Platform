const db = require("../db.js");
require("../middleware/verfiyUser.js");

const postVote = (req,res)=>{
    const cat_id = req.params.selectedCategoryId;
    const prob_id = req.params.selectedQuestionId;
    const sql = 'INSERT INTO  vote(cat_id,prob_id) VALUES (?,?)';
    db.query(sql,[cat_id,prob_id],(err,result)=>{
        if(err){
            console.error("insertion error in the database");
            return res.status(500).json({error:"insertion error"})
        }
        res.status(200).json({message:"response added succeffuly"});
    })
}

module.exports = postVote;