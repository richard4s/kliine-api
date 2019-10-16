const jwt = require('jsonwebtoken');
const validator = require('./validations/validate');

module.exports = (req, res, next) => {
    if(req.body.email && req.body.password) {  

    //     const userCheck = new Schema({
    //         email: {
    //             type: String,
    //             required: true,
    //             length: {
    //                 min: 6,
    //                 max: 32
    //             },
    //             match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    //         },
    //         password: {
    //             type: String,
    //             required: true,
    //             length: {
    //                 min: 6,
    //                 max: 64
    //             }
    //         }
    //     }) ;

    //     const errors = userCheck.validate(req.body.email);

        // const emailCheck = validator(req.body.email, email);

        // if(emailCheck)
        //     return res.status(401).send(emailCheck);
        // else
        //     return res.status(200).send(emailCheck);
        next()

    } else {
        return res.status(400).send({
            error: 'Email or password cannot be empty'
        });
    }
};