const User = require('../Models/UsersModel');
const bcrypt = require('bcrypt');


const LoginPage = (req, res) => {
    // Web logic here
    res.render('pages/login');
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !user.is_active) {
        return res.render( 'pages/login', { message: 'Invalid username or inactive account' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.render('pages/login', { message: 'Invalid Credentials' });
        }
       
        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
    }
};

const userDashboard = (req, res) => {
    return res.render('pages/dashboard');
};

const logOutUser = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.redirect('/500');
      } else {
        res.redirect('/login'); // Redirect to home or login page
      }
    });
  };
  

module.exports = {  
    LoginPage,
    loginUser,
    userDashboard,
    logOutUser
};