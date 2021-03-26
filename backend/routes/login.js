const router = require('express').Router();
const Login = require('../models/login.model');

router.route('/').get((req, res) => {
    Login.find()
        .then(login => res.json(login))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = String(req.body.username);
    const password = String(req.body.password);

    const newLogin = new Login({
        username,
        password,
    });

    newLogin.save()
        .then(() => res.json('Login adicionado!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;