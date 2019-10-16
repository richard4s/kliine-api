const Users = require('../controllers').Users;

//Custom Middleware
const verifyToken = require('../middleware/verifyToken');
const login = require('../middleware/login');

function emailPresent(req, res, next) {
    if(req.body.email) {
        res.status(200).send({
            message: 'Email is present',
            requests: req.body.email
        })
    } else {
        next()
    }       
}

module.exports = (app) => {
    app.get('/api', emailPresent, (req, res, next) => {
        res.status(200).send({
            message: 'Kliining mocking email test route',
        })
    });

    app.get('/api/mock', Users.mock);

    app.post('/api/register', Users.register);

    app.post('/api/login', login, Users.login);

    app.delete('/api/destroy', Users.destroy);

    app.get('/api/verify-email/:token', verifyToken, Users.verifyEmail);
};