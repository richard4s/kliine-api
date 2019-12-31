const Plans = require('../models').Plans;
const planTypes = require('../../constants/plans');
const status = require('../../constants/status');

module.exports = {
    mock(req, res) {
        return Plans.findAll()
        .then(Plans => res.status(200).send({
            users: Users,
            message: 'Plans Mocking Test!'
        }))
        .catch(error => res.status(400).send(error))
    },

    createPlan(req, res, next) {
        return Plans
        .create({
            name: req.body.name,
            status: status.active,
            userId: req.body.userId,
            type: req.body.planType,
            rooms: req.body.rooms,
            bathroom: req.body.bathroom,
            laundry: req.body.laundry,
            duration: req.body.duration,
            expDate: req.body.expDate
        })
        .spread((plan, created) =>  {
            Plans.findByPk(plan.id)
            .then((Plan) =>  {
                return res.status(201).send({
                    success: 'Plan Created Successfully!',
                    Plan: Plan
                })
            }).catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

    // youngin(req, res, next) {

    // },

    // standard(req, res, res) {

    // },

    // kliine(req, res, next) {

    // },

    // kliinePlus(req, res, next) {
        
    // }

}