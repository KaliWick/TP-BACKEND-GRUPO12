require('dotenv').config();


const mysql = require ('mysql2');

const connection = mysql.createConnection({
   /* 
   host : 'localhost',
    user : 'root',
    password : 'Joaquin_1401',
    database: 'grupo12_db'
    */
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    if(err){
        console.error('ERROR CONECTANDO A LA BASE DE DATOS');
        return;
    }
    console.log('CONEXION A LA BASE DE DATOS EXITOSA');
});

module.exports = connection;
