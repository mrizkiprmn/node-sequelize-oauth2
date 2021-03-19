const express = require('express')
const router = express.Router()
const OAuthController = require('../controllers/oauthcontrollers')
const OAuthServer = require('express-oauth-server')



router.get('/', function(req, res, next) {
    res.render('index', {title: 'API Rizki Permana'});
});

router.oauth = new OAuthServer({
    model: OAuthController
});

router.post('/auth/token', router.oauth.token());

router.post('/auth/clients', function(req, res, next) {
    OAuthController.setClient(req.body)
    .then((client) => res.json(client))
    .catch((err) => {
        return next(err)
    });
})

router.post('/auth/signup', function(req, res, next) {
    OAuthController.setUser(req.body)
    .then((user) => res.json((user)))
    .catch((err) => {
        return next(err)
    });
});

router.get('/secret', router.oauth.authenticate(), function(req, res) {
    res.json('Secret Area')
})

module.exports = router