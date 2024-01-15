const apiRoutes = require('../Routes/api');
const webRoutes = require('../Routes/web');
const BodyParser = require('body-parser');
module.exports = (app) => {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.use('/', webRoutes);
};
