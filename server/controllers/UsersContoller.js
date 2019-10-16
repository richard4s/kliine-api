const Users = require('../models').Users;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const nodemailer = require('nodemailer');
var mailerhbs = require('nodemailer-express-handlebars');

const jwt = require('jsonwebtoken');

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

    //Register user
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
            if(created) {
                const token = jwt.sign({
                    data: req.body.email
                  }, process.env.JWT_SECRET , { expiresIn: '1h' });
                  
                    let verifyOptions = {
                        from: 'Kliine <noreply@kliine.com>',
                        to: req.body.email,
                        subject: 'Welcome to Kliine',
                        template: 'welcome',
                            context: { 
                                userId: user.id,
                                verifyUrl: req.headers.host,
                                token: token
                            }
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
                    
                    transporter1.sendMail(verifyOptions, (err, info) => {
                        if(err)
                            console.log(err)
                        else
                            console.log(info);
                    }, (err, response) => {
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

    //Verify user email
    verifyEmail(req, res, next) {
        return Users.update({
                emailVerified: true
            }, {
                where: {
                    email: res.locals.decodedToken
                }
            })
            .then(user => {
                res.status(201).send({
                    message: "Email has been verified",
                    user: user
                })
            })
            .catch(error => res.status(400).send(error));
    },

    //Login user
    login(req, res, next) {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).send({
                        message: 'Something terrible went wrong'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        data: user.email
                      }, process.env.JWT_SECRET , { expiresIn: '1h' });
                    
                    return res.status(200).send({
                        message: `${result} - user authenticated!`,
                        token: token,
                        user: user
                    })
                } else if(!result) {
                    return res.status(401).send({
                        message: 'Password incorrect',
                        user: result
                    })
                }
            })
        })
        .catch(error => res.status(400).send({
            message: 'Could not find user with that email'
        }));
    },

    //Delete user from DB
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