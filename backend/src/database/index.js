const mysql = require('mysql2');
const dbConfig =  require('../config/database');

const con = mysql.createConnection(dbConfig);

con.connect((err)=>{
    if(err){
        console.log(err);
        throw err
    };
})

module.exports = con;