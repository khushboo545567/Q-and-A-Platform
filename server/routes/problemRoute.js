const express = require("express");
const router = express.Router();
const verifyUser = require('../middleware/verfiyUser.js');
const postProblem = require("../controllers/postproblem.js");
const getProblem = require("../controllers/getProblem.js");

router.post('/:selectedCategoryId', verifyUser,postProblem);
router.get('/get',getProblem)

module.exports = router;