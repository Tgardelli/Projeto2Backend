// Cuida das conexões

// Importa os packages necessarios
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

// Importa as rotas
const authRoutes = require('./routes/authRoutes');

// Inicializa o express
const app = express();
const PORT = process.env.PORT || 3000;

// --- DATABASE ---
// Faz a conexão com o mongo e da o nome de thiago-vitoria-backend-2
const MONGO_URI = 'mongodb://localhost:27017/thiago-vitoria-backend-2';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- MIDDLEWARE ---

// Abre as paginas como ejs
app.set('view engine', 'ejs');
app.set('views', 'views'); // especifica a pasta onde as paginas estão

// Auxilio para os forms de data
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'um_super_cookie_secreto_que_abre_uma_pagina_ultra_secreta_que_e_escrito_por_essa_linha', // This should be a long, random string in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
        maxAge: 1000 * 60 * 5 // 5 minutes
    }
}));

// Middleware para validar a sessão
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});


// --- ROTAS ---
app.use(authRoutes);

// Root redireciona a pagina login
app.get('/', (req, res) => {
    res.redirect('/login');
});


// --- Inicia o SERVER ---
app.listen(PORT, () => {
    console.log(`Server esta rodando em http://localhost:${PORT}`);
});
