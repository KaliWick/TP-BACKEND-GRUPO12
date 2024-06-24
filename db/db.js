const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Joaquin_1401',
    database: 'grupo12_db'
});

connection.connect((err)=>{
    if(err){
        console.error('ERROR CONECTANDO A LA BASE DE DATOS');
        return;
    }
    console.log('CONEXION A LA BASE DE DATOS EXITOSA');
});

module.exports = connection;
