

const forgertPassword = (req, res) => {
    return res.render('pages//forget-password');
};
const sendResetPasswordLink = (req, res) => {
    const { email } = req.body;
    
};
const resetPassword = (req, res) => {};
const updateUserPassword = (req, res) => {};





module.exports = {  
    forgertPassword, 
    sendResetPasswordLink, 
    resetPassword, 
    updateUserPassword
};