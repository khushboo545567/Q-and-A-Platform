const mysql = require("mysql2")
require("dotenv").config();

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER ,
    password:process.env.MYSQL_PASS,
    database:process.env.DATABASE_NAME
})

db.connect((err)=>{
    if(err){
        console.log("error in connecting database",err)
    }
    else{
        console.log("database connected succeffuly")
    }
})

module.exports = db;