const apiRoutes = require('../Routes/api');
const webRoutes = require('../Routes/web');

module.exports = (app) => {
    app.use('/api', apiRoutes);
    app.use('/', webRoutes);
};
