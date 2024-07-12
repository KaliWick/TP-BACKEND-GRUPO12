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


//todo lo que necesita para manejar las sesiones y el CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://tp-backend-grupo-12.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(session({
    secret: 'grupo12node', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, 
        maxAge: null,
        domain: '.tp-backend-grupo-12.vercel.app', 
        path: '/',
        expires: false
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//usos
app.use('/comentarios',comentariosRoutes);
app.use('/index',indexRoutes);
app.use('/inicioSesion',inicioSesionRoutes);
app.use('/peliculas',peliculasRoutes);
app.use('/registro',registroRoutes);
app.use('/usuarios',usuariosRoutes);
app.use('/categorias',categoriasRoutes);


//usos de archivos estaticos
app.use('/html', express.static(path.join(__dirname,'..', 'public', 'html')));
app.use('/css', express.static(path.join(__dirname,'..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname,'..', 'public', 'js')));
app.use('/img', express.static(path.join(__dirname,'..', 'public', 'img')));

//ruta para el menu principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

//ruta para usuarios
app.get('/usuarios', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'usuarios.html'));
    } else {
        res.redirect('/inicioSesion'); 
    }
});

//ruta para iniciar sesion
app.get('/inicioSesion', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'inicioSesion.html'));
});

//ruta para registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'registro.html'));
});

//ruta para desarrollador
app.get('/modoDesarrollador', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'modoDesarrollador.html'));
});


//ruta para mostrar los datos
app.get('/usuarios/datos', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'No autenticado' });
    }
});

//ruta para cerrar la sesion
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.redirect('/inicioSesion');
    });
});

//manejo de errores
app.use((err, req, res, next) => {
    console.error('Error de aplicación:', err.stack);
    res.status(500).send('Error interno del servidor');
});

//puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});