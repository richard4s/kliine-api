const Plans = require('../models').Plans;

module.exports = {
    mock(req, res) {
        return res.status(200).send({
            message: 'You have hit our plans mock'
        })
    },

    youngin(req, res, next) {

    },

    standard(req, res, res) {

    },

    kliine(req, res, next) {

    },

    kliinePlus(req, res, next) {
        
    }

}