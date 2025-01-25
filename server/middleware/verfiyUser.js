const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyUser = (req,res,next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.token){
        token = req.cookies.token;
    }
    if(!token){
        return res.status(401).json({error:"unauthorized"})
    }
    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        req.u_id = decode.userId
        next()
    }catch(err){
        console.error("Token verification failed:", err.message);
        return res.status(401).json({error:'invalid token'})
    }
}

module.exports = verifyUser