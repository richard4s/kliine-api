const Users = require('../controllers').Users;

function emailPresent(req, res, next) {
    if(req.body.email) {
        res.status(200).send({
            message: 'Usaage guyyyy',
            requests: req.body.email
        })
    } else {
        next()
    }       
}

module.exports = (app) => {
    app.get('/api', emailPresent, (req, res, next) => {
        res.status(200).send({
            message: 'Kliining mocking test again api',
        })
    });

    app.get('/api/mock', Users.mock);

    app.post('/api/register', Users.register);

    app.delete('/api/destroy', Users.destroy);
};