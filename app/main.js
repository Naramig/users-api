const express = require('express')
const dotenv = require('dotenv');

const {baseInsert} = require("./storages/baseInsert")
const {ENV} = require("./helpers/state")
const db = require("./storages/db");

const app = express()
app.use(express.json());
dotenv.config();

function checkEnv() {
    for (const data of ENV) {
        if (data in process.env) {
        } else {
            throw new Error(`${data} env IS NOT SET`)
        }
    }
}

exports.init = async function () {
    return new Promise((resolve, reject) => {
        try {
            // check that all ENV exist
            checkEnv()

            //sync DB
            db.sequelize.sync();

            //Insert admin user
            baseInsert()

            app.get('/ping', (req, res) => {
                res.send('pong')
            })

            require("./routes/users.routes")(app);
            require("./routes/auth.routes")(app);


            app.listen(process.env.PORT, () => {
                console.log(`User app listening on port ${process.env.PORT}`)
            })
            resolve();
        } catch (err) {
            console.log("Initialization error", err);
            reject(err);
        }
    });
};