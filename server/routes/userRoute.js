const express = require("express");
const signupHandler = require("../controllers/userControllers");
const loginHandler = require("../controllers/loginHandler.js");
const router = express.Router();

router.post('/signup',signupHandler)
router.post('/login',loginHandler)

module.exports = router