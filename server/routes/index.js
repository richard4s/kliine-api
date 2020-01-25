//Controllers
const Users = require('../controllers').Users;
const Plans = require('../controllers').Plans;

//Custom Middleware
const verifyToken = require('../middleware/verifyToken');
const register = require('../middleware/register');
const login = require('../middleware/login');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminCheck = require('../middleware/adminCheck');
const emailCheck = require('../middleware/emailCheck');

function emailPresent(req, res, next) {
    if(req.body.email) {
        res.status(200).send({
            message: 'Email is present',
            requests: req.body.email
        })
    } else {
        next()
    }       
}

module.exports = (app) => {
    // User-Related Endpoints
    app.get('/api', emailPresent, (req, res, next) => {
        res.status(200).send({
            message: 'Kliining mocking email test route',
        })
    });

    app.get('/api/mock', Users.mock);

    app.post('/api/register', [emailCheck, register], Users.register);

    app.post('/api/login', login, Users.login);

    app.post('/api/resend-verification', Users.resendVerification);

    app.post('/api/forgot-password', [emailCheck, auth], Users.forgotPassword);

    app.post('/api/reset-password/:token', verifyToken, Users.resetPassword);

    app.put('/api/update-profile', Users.updateProfile); //Middleware Needed

    app.delete('/api/destroy', adminCheck, Users.destroy);

    app.get('/api/verify-email/:token', verifyToken, Users.verifyEmail);

    //Plans-Related Endpoints
    app.get('/api/plans/mock', Plans.mock);
    app.get('/api/plans/mockPlanTypes', Plans.mockPlanTypes);
    app.post('/api/plans/create', Plans.createPlan);
};