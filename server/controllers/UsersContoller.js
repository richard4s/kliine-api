const Users = require('../models').Users;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const nodemailer = require('nodemailer');
var mailerhbs = require('nodemailer-express-handlebars');

module.exports = {
    mock(req, res) {
        return Users
            .findAll()
            .then(Users => res.status(200).send({
                users: Users,
                message: 'Mocking Test!'
            }))
            .catch(error => res.status(400).send(error));
    },

    register(req, res, next) {
        return Users
        .findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                emailVerified: false,
                password: bcrypt.hashSync(req.body.password, salt),
                isAdmin: false  
            }
        }).spread((user, created) => {
            if(created){
                    let verifyOptions = {
                        from: 'Kliine <afolabioluwo50@gmail.com>',
                        to: req.body.email,
                        subject: 'Welcome to Kliine',
                        template: 'welcome',
                            // context: { 
                            //     verifyUrl: req.body.csoName,
                            // }
                    };
                
                    const transporter1 = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                                user: 'afolabioluwo50@gmail.com',
                                pass: 'burner_password123'
                            }
                    });
                
                    const handlebarOptions = {
                        viewEngine: {
                        extName: '.hbs',
                        partialsDir: './mail/templates',
                        layoutsDir: './mail/templates',
                        defaultLayout: 'welcome.hbs',
                        },
                        viewPath: './mail/templates',
                        extName: '.hbs',
                    };
                    
                    transporter1.use('compile', mailerhbs(handlebarOptions));
                    
                    transporter1.sendMail(verifyOptions, function (err, info) {
                        if(err)
                            console.log(err)
                        else
                            console.log(info);
                    }, function (err, response) {
                        if (err) {
                            res.status(400).json({
                                message: 'Error sending email.'
                            });
                        }
                })

                res.status(200).send({
                    message: 'User created successfully',
                    user: user,
                    created: created
                })
            } else {
                res.status(400).send({
                    message: 'User with that email already exists',
                    created: created
                })
            }
        })
        .catch(error => res.status(400).send(error));
        
    },

    destroy(req, res, next) {
        return Users.destroy({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            res.status(200).send({
                message: 'User deleted!',
                user: user //Returns number of users deleted
            })
        })
        .catch(error => res.status(400).send(error));
    },
};