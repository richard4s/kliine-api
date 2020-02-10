//Models
const Users = require('../models').Users;

const Plans = require('../models').Plans;
const PlanTypes = require('../models').PlanType;
const Meals = require('../models').Meals;
const MealType = require('../models').MealType;
const Rooms = require('../models').Rooms;
const Laundry = require('../models').Laundry;

//Constants
const planTypes = require('../../constants/plans');
const status = require('../../constants/status');

module.exports = {
    test(req, res) {
        return res.status(200).send({
            success: 'This is just a test endpoint!'
        })
    },

    mock(req, res) {
        return Plans.findAll()
        .then((Plans) => res.status(200).send({
            plans: Plans,
            success: 'Plans Mocking Test!'
        }))
        .catch((error) => res.status(400).send({ error: error }))
    },

    mockPlanTypes(req, res, next) {
        return PlanTypes.findAll({
            attributes: {
                exclude: ['rooms', 'laundry', 'meals', 'createdAt', 'updatedAt']
            },
            include: [{
                model: Rooms,
                as: 'roomsforPlanType',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: Laundry,
                as: 'laundriesPlanType',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: Meals,
                as: 'mealsPlanType',
                include: [{
                    model: MealType,
                    as: 'mealTypesPlanType',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
        })
        .then((PlanTypes) => res.status(200).send({
            planTypes: PlanTypes,
            success: 'Gotten the plan Types'
        }))
        .catch((error) => {
            console.log(error)
            res.status(400).send({ error: error })
        })
    },

    planForUser(req, res, next) {
        Users.findOne({
            where: {
                email: res.locals.decodedHeaders
            }
        })
        .then((user) => {
            Plans.findAll({
                include: [{
                    model: PlanTypes,
                    as: 'planType',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Rooms,
                        as: 'roomsforPlanType',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }, {
                        model: Laundry,
                        as: 'laundriesPlanType',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }, {
                        model: Meals,
                        as: 'mealsPlanType',
                        include: [{
                            model: MealType,
                            as: 'mealTypesPlanType',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }]
                }],
                where: {
                    userId: user.id
                }
            })
            .then((plan) => {
                return res.status(200).send({
                    plan: plan,
                    success: 'User Plan Success'
                })
            })
            .catch((err) => {
                return res.status(400).send({
                    error: err,
                    message: 'Plan does not exist for this user. Create one?'
                })
            })
        })
        .catch((err) => {
            return res.status(400).send({
                error: err
            })
        })
    },

    createPlan(req, res, next) {
        Users.findOne({
            where: {
                email: res.locals.decodedHeaders
            }
        })
        .then((user) => {
            Plans.create({
                name: req.body.name,
                status: status.active,
                userId: user.id,
                type: req.body.type,
                address: req.body.address,
                expDate: req.body.expDate
            })
            .then((plan) =>  {
                Plans.findByPk(plan.id)
                .then((Plan) =>  {
                    return res.status(201).send({
                        success: 'Plan Created Successfully!',
                        plan: Plan
                    })
                }).catch(error => res.status(400).send({error: error}));
            })
            .catch(error => res.status(400).send({error: error, msg: 'whyyy'}));
        })
        .catch((err) => {
            res.status(400).send({
                error: err
            })
        })
    }

}