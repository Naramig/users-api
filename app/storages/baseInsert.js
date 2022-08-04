const {hashData} = require("../helpers/utils");
const users = require("./users.storage");

exports.baseInsert = async () => {
    const user = {
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD ? await hashData(process.env.ADMIN_PASSWORD) : await hashData("password"),
        email: process.env.ADMIN_EMAIL || "email",
        isAdmin: true
    }
    const exists = await users.checkIfUserExist(user.username);
    if (exists) {
        return
    }
    await users.createNewUser(user)
}