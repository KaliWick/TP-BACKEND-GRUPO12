const express = require ('express');
const app = express();

const categoriasRoutes = require('../routes/categorias');
const comentariosRoutes = require('../routes/comentarios');
const indexRoutes = require('../routes/index');
const peliculasRoutes = require('../routes/peliculas');
const usuariosRoutes = require('../routes/usuarios');

app.use(express.json());
app.use('/categorias',categoriasRoutes);
app.use('/comentarios',comentariosRoutes);
//app.use('/index',indexRoutes);
app.use('/peliculas',peliculasRoutes);
app.use('/usuarios',usuariosRoutes);

const port = 3000;

app.listen(port,()=>{
    console.log(`Servidor funcionando en el puerto ${port}`); 
});