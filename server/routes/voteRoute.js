const express = require("express");
const router = express.Router();
const verifyUser = require('../middleware/verfiyUser.js');
const postVote = require("../controllers/postVote.js");
const getVote = require("../controllers/getVote.js");

router.post('/send/:selectedCategoryId/:selectedQuestionId',postVote);
router.get('/fetch/:selectedQuestionId',verifyUser,getVote);

module.exports = router;