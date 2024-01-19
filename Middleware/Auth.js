const isLogin = (req, res, next) => {
    if (req.session && req.session.user) next();
    else return res.redirect('/login');
};

const isLogout = (req, res, next) => {
    if (!req.session || !req.session.user) next();
    else return res.redirect('/dashboard');
};

module.exports = { isLogin, isLogout };
