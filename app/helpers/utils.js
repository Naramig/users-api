const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const state = require("./state");
const kafka = require("../kafka");

exports.hashData = async (data) => {
    const saltRounds = 10;
    return bcrypt.hashSync(data, saltRounds);
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.sendEmail = async (email, name) => {
    const msg = prepareMsg(name);
    const result = await kafka.producer.send({
        "topic": "Users",
        "messages": [
            {
                "value": JSON.stringify({msg, email}),
            }
        ]
    })
    console.log("Done!", result)
}

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
}

function prepareMsg(name) {
    return state.emailMsg.replace(/<NAME>/g, name);

}