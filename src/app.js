const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

const comentariosRoutes = require('../routes/comentarios');
const indexRoutes = require('../routes/index');
const inicioSesionRoutes = require('../routes/inicioSesion');
const peliculasRoutes = require('../routes/peliculas');
const registroRoutes = require('../routes/registro');
const usuariosRoutes = require('../routes/usuarios');

app.use(express.json());
app.use('/comentarios',comentariosRoutes);
app.use('/index',indexRoutes);
app.use('/inicioSesion',inicioSesionRoutes);
app.use('/peliculas',peliculasRoutes);
app.use('/registro',registroRoutes);
app.use('/usuarios',usuariosRoutes);

const exp = require('constants');

app.use('/html', express.static(path.join(__dirname,'..', 'public', 'html')));
app.use('/css', express.static(path.join(__dirname,'..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname,'..', 'public', 'js')));
app.use('/img', express.static(path.join(__dirname,'..', 'public', 'img')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

app.listen(port,()=>{
    console.log(`Servidor funcionando en el puerto ${port}`); 
});