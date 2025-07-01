// Define as rotas do site

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// --- Middleware de autenticação ---
// Metodo de checa se o usuario esta logado
const isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/login');
};

// --- Define as rotas do site ---

// GET /login - Renderiza a pagina de login
router.get('/login', authController.getLogin);

// POST /login - Cuida da submissão do form de login
router.post('/login', authController.postLogin);

// GET /register - Renderiza a pagina de registro
router.get('/register', authController.getRegister);

// POST /register - Cuida do form de registro
router.post('/register', authController.postRegister);

// POST /logout - Cuida do logout do usuario
router.post('/logout', authController.postLogout);

// GET /protected - Renderiza a pagina protegida apos autenticação
router.get('/protected', isAuth, authController.getProtected);


module.exports = router;
