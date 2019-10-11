const Users = require('../controllers').Users;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Kliining mocking test again api',
    }));

    app.get('/api/mock', Users.mock);
};