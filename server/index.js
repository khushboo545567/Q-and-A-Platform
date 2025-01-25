const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db");
const userroute = require('./routes/userRoute.js');
const problemroute = require('./routes/problemRoute.js');
const solutionroute = require('./routes/solutionRoute.js');
const voteRoute = require('./routes/voteRoute.js');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(cors({origin:'http://localhost:5173',Credential:true}))

app.use('/user',userroute)
app.use('/problem',problemroute)
app.use('/solution',solutionroute)
app.use('/vote',voteRoute);

app.listen(process.env.PORT || 3000 ,(err)=>{
    console.log(`server is listinig on the port ${process.env.PORT}`);
})