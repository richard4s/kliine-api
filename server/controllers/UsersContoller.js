const Users = require('../models').Users;

module.exports = {
    mock(req, res) {
        return Users
            .findAll()
            .then(Users => res.status(200).send({
                message: 'Mocking Test!'
            }))
            .catch(error => res.status(400).send(error));
    },
};