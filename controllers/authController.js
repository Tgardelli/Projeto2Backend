// Controle das paginas

const User = require('../models/user');

// Renderiza a pagina de login se o cookie ainda não estiver ativo
exports.getLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/protected');
    }
    res.render('login', {
        pageTitle: 'Login',
        errorMessage: null
    });
};

// Renderiza a pagina de cadastro se o cookie ainda não estiver ativo
exports.getRegister = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/protected');
    }
    res.render('register', {
        pageTitle: 'Register',
        errorMessage: null
    });
};

// Registra o usuario
exports.postRegister = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Checa se o usuario ja esta cadastrado
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(422).render('register', {
                pageTitle: 'Register',
                errorMessage: 'Username ja existe. Por favor escolher outro.'
            });
        }

        // Cria e salva um novo usuario
        const user = new User({ username, password });
        await user.save();

        // Redireciona para a pagina de login se o cadastro for completado
        res.redirect('/login');

    } catch (err) {
        console.error(err);
        res.status(500).render('register', {
            pageTitle: 'Register',
            errorMessage: 'Ocorreu um erro no cadastro.'
        });
    }
};

// Faz o login do usuario
exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Encontra usuario por nome
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).render('login', {
                pageTitle: 'Login',
                errorMessage: 'Invalid username or password.'
            });
        }

        // Compara a senha com a senha registrada no banco
        const doMatch = await user.comparePassword(password);
        if (doMatch) {
            // Se a senha esta correta, cria uma sessão
            req.session.isLoggedIn = true;
            req.session.user = user;
            // Salva a sessão e redireciona para a pagina
            return req.session.save(err => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/protected');
            });
        }

        // Caso a senha esteja incorreta
        res.status(401).render('login', {
            pageTitle: 'Login',
            errorMessage: 'Invalid username or password.'
        });

    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
};

// Faz o logout da pagina e destroi a sessão
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};

// Renderiza a pagina protegida
exports.getProtected = (req, res, next) => {
    res.render('protected', {
        pageTitle: 'Protected Page',
        username: req.session.user.username
    });
};