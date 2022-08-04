const models = require('../models/users.model')
const {make} = require('simple-body-validator');
const {rules} = require("../helpers/validationRules")

exports.signUp = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const validator = make(user, rules.SIGN_UP);
    if (!validator.validate()) {
        res.status(400).send({message: validator.errors().all()});
        return;
    }


    await models.signUp(req.body, (err, data) => {
        if (err)
            res.status(err.code || 500).send({
                message:
                err.message
            });
        else res.send(data);
    });


};

exports.signIn = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: req.body.username,
        password: req.body.password
    }

    const validator = make(user, rules.SIGN_IN);
    if (!validator.validate()) {
        res.status(400).send({message: validator.errors().all()});
        return;
    }

    await models.signIn(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    });

};

exports.getAllUsers = async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403)
    await models.getAllUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    });
}

exports.getUser = async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403)
    if (!req.params) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    await models.getUser(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    });
}

exports.deleteUserById = async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403)
    if (!req.params) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    await models.deleteUser(req.params.id, (err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send();
    });
}


exports.deleteUser = async (req, res) => {
    await models.deleteUser(req.user.id, (err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send();
    });
}

exports.createUser = async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403)

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    if (!req.params) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }

    const validator = make(user, rules.CREATE_NEW_USER);
    if (!validator.validate()) {
        res.status(400).send({message: validator.errors().all()});
        return;
    }

    await models.createUser(user, (err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send();
    });
}


exports.updateUserById = async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403)

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }

    const validator = make(user, rules.UPDATE_USER);
    if (!validator.validate()) {
        res.status(400).send({message: validator.errors().all()});
        return;
    }

    await models.updateUser(req.params.id, user, (err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send();
    });
}


exports.updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const validator = make(user, rules.UPDATE_USER);
    if (!validator.validate()) {
        res.status(400).send({message: validator.errors().all()});
        return;
    }

    await models.updateUser(req.user.id, user, (err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send();
    });
}