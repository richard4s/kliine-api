const Users = require('../models').Users;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const nodemailer = require('nodemailer');
var mailerhbs = require('nodemailer-express-handlebars');

const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = {
    mock(req, res) {
        return Users
            .findAll()
            .then(Users => res.status(200).send({
                users: Users,
                success: 'Mocking Test!'
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
                                error: 'Error sending email.'
                            });
                        }
                })

                res.status(200).send({
                    success: 'User created successfully',
                    user: user,
                    created: created
                })
            } else {
                res.status(400).send({
                    error: 'User with that email already exists',
                    created: created
                })
            }
        })
        .catch(error =>  {
            console.log('Errors: ', error)
            res.status(400).send(error)
        });
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
                    success: "Email has been verified",
                    user: user
                })
            })
            .catch(error => res.status(400).send({ error: error }));
    },

    //Resend verification email
    resendVerification(req, res, next) {
        if(validator.isEmail(req.body.email)) {
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if(user.emailVerified) {

                    return res.status(400).send({
                        error: 'Your email has already been verified.'
                    })
                } 
                else {
                    const token = jwt.sign({
                        data: req.body.email
                      }, process.env.JWT_SECRET , { expiresIn: '1h' });
                      
                        let verifyOptions = {
                            from: 'Kliine <noreply@kliine.com>',
                            to: req.body.email,
                            subject: 'Welcome to Kliine',
                            template: 'welcome',
                                context: { 
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
                                return res.status(400).json({
                                    error: 'Error sending email.'
                                });
                            }
                    })
            
                    return res.status(200).send({
                        success: 'Verification email sent',
                        toEmail: req.body.email
                    })                
                }            
            })
            .catch(error => {
                return res.status(400).send({
                    error: error
                });
            }) 
        } else {
            return res.status(400).send({
                error: 'That does not look like a valid email'
            });
        }
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
                        error: 'Something terrible went wrong'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        data: user.email
                      }, process.env.JWT_SECRET , { expiresIn: '1h' });
                    
                    return res.status(200).send({
                        success: `${result} - user authenticated!`,
                        token: token,
                        // isEmailVerified: res.locals.isEmailVerified,
                        user: user
                    })
                    
                } else if(!result) {
                    return res.status(401).send({
                        error: 'Password incorrect',
                        user: result
                    })
                }
            })
        })
        .catch(error => res.status(400).send({
            error: 'Could not find user with that email'
        }));
    },

    updateProfile(req, res, next) {
         
        try {
            Object.keys(req.body).forEach((key) => {
                console.log(key, req.body[key]);

                return Users.update({
                    key: req.body[key] 
                }, {
                    where: {
                        id: req.body.id
                    }
                })
            })
                
            res.status(201).send({
                    success: 'Successfully updated user profile'
                })
        } catch(error) {
            res.status(401).send({
                error: 'Could not find user with that id. ' + error,
                error: error
            })
        }
                
    },

    //Forgot Password
    forgotPassword(req, res, next) {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(users => {
            const token = jwt.sign({
                data: req.body.email
              }, process.env.JWT_SECRET , { expiresIn: '1h' });
              
                let verifyOptions = {
                    from: 'Kliine <noreply@kliine.com>',
                    to: req.body.email,
                    subject: 'Kliine Password Reset',
                    template: 'reset-password',
                        context: { 
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
                    defaultLayout: 'reset-password.hbs',
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
                        return res.status(400).json({
                            error: 'Error sending email.'
                        });
                    }
            })
    
            res.status(200).send({
                success: 'Password reset email sent',
                toEmail: req.body.email
            })    
        })
        .catch(error => res.status(400).send({
            error: 'Could not find user with that email' + error 
        }));
    },

    //Reset user password
    resetPassword(req, res, next) {
        return Users.update({
                resetToken: req.params.token,
                password: req.body.password
            }, {
                where: {
                    email: res.locals.decodedToken
                }
            })
            .then(user => {
                res.status(201).send({
                    success: "Password has been reset",
                    user: user
                })
            })
            .catch(error => res.status(400).send({error: error}));
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
                success: 'User deleted!',
                user: user, //Returns number of users deleted
                isAdmin: res.locals.isAdmin
            })
        })
        .catch(error => res.status(400).send({error: error}));
    },
};