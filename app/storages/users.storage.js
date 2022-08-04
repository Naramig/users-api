const db = require("./db");
const Users = db.users;

exports.checkIfUserExist = async (username) => {
    return await Users.findOne({
        where: {
            username: username
        }
    });
}

exports.checkIfUserExistById = async (id) => {
    return await Users.findOne({
        where: {
            id: id
        }
    });
}
exports.updateUserData = async (id, user) => {
    return await Users.update(user, {
        where: {
            id: id
        }
    })
}

exports.createNewUser = async (user) => {
    const userResult = await Users.create(user);
    return {id: userResult.id, username: userResult.username, email: userResult.email, isAdmin: userResult.isAdmin}
}

exports.getAllUsers = async () => {
    return await Users.findAll()
}

exports.getUser = async (id) => {
    return await Users.findOne({attributes: ['username', 'id', 'email', 'isAdmin']}, {
        where: {
            id: id
        }
    })
}

exports.deleteUser = async (id) => {
    return await Users.destroy({
        where: {
            id: id
        }
    })
}