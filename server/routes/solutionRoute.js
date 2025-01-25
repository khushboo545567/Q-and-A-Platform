const express = require("express");
const router = express.Router();
const verifyUser = require('../middleware/verfiyUser.js');
const postSolution = require("../controllers/postSolution.js");
const getSolution = require("../controllers/getSolution.js");

router.post("/send/:selectedCategoryId/:selectedQuestionId",verifyUser,postSolution);
router.get('/get/:selectedQuestionId',verifyUser,getSolution);

module.exports = router;