const apiController = (req, res) => {
    // API logic here
    res.send('API Controller');
};
const webController = (req, res) => {
    // Web logic here
    res.render('pages/login');
};



module.exports = { 
    apiController, 
    webController,
};