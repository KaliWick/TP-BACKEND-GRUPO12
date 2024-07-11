const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const path = require('path');


const comentariosRoutes = require('../routes/comentarios');
const indexRoutes = require('../routes/index');
const inicioSesionRoutes = require('../routes/inicioSesion');
const peliculasRoutes = require('../routes/peliculas');
const registroRoutes = require('../routes/registro');
const usuariosRoutes = require('../routes/usuarios');
const categoriasRoutes = require('../routes/categorias');

app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'grupo12node', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use('/comentarios',comentariosRoutes);
app.use('/index',indexRoutes);
app.use('/inicioSesion',inicioSesionRoutes);
app.use('/peliculas',peliculasRoutes);
app.use('/registro',registroRoutes);
app.use('/usuarios',usuariosRoutes);
app.use('/categorias',categoriasRoutes);

const exp = require('constants');

app.use('/html', express.static(path.join(__dirname,'..', 'public', 'html')));
app.use('/css', express.static(path.join(__dirname,'..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname,'..', 'public', 'js')));
app.use('/img', express.static(path.join(__dirname,'..', 'public', 'img')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});


app.get('/usuarios', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'usuarios.html'));
    } else {
        res.redirect('/inicioSesion.html'); 
    }
});
app.get('/usuarios/datos', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'No autenticado' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.redirect('/html/inicioSesion.html');
    });
});

app.listen();