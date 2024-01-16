const apiRoutes = require('../Routes/api');
const webRoutes = require('../Routes/web');
const BodyParser = require('body-parser');
const {session, sessionConfig}  = require('./Session');
module.exports = (app) => {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use(session(sessionConfig));
    app.use('/api', apiRoutes);
    app.use('/', webRoutes);
};
