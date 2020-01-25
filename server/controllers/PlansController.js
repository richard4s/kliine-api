//Models
const Plans = require('../models').Plans;
const PlanTypes = require('../models').PlanType;

//Constants
const planTypes = require('../../constants/plans');
const status = require('../../constants/status');

module.exports = {
    mock(req, res) {
        return Plans.findAll()
        .then((Plans) => res.status(200).send({
            plans: Plans,
            success: 'Plans Mocking Test!'
        }))
        .catch((error) => res.status(400).send({ error: error }))
    },

    mockPlanTypes(re, res, next) {
        return PlanTypes.findAll()
        .then((PlanTypes) => res.status(200).send({
            planTypes: PlanTypes,
            success: 'Gotten the plan Types'
        }))
        .catch((error) => res.status(400).send({ error: error }))
    },

    createPlan(req, res, next) {
        return Plans
        .create({
            name: req.body.name,
            status: status.active,
            userId: req.body.userId,
            type: req.body.planType,
            address: req.body.address,
            expDate: req.body.expDate
        })
        .spread((plan, created) =>  {
            Plans.findByPk(plan.id)
            .then((Plan) =>  {
                return res.status(201).send({
                    success: 'Plan Created Successfully!',
                    plan: Plan
                })
            }).catch(error => res.status(400).send({error: error}));
        })
        .catch(error => res.status(400).send({error: error}));
    }

}