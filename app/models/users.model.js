const st = require('../storages/users.storage');
const {hashData, sendEmail, generateAccessToken} = require("../helpers/utils");
const bcrypt = require("bcrypt");

exports.signUp = async (user, result) => {
    try {
        const exist = await st.checkIfUserExist(user.username)
        if (exist) {
            result({message: "User already exists", code: 409}, null);
            return;
        }
        user.password = await hashData(user.password);
        await st.createNewUser(user)
        await sendEmail(user.email, user.username)
        result(null, {success: true});
    } catch (e) {
        result({message: e}, null);
    }
}

exports.signIn = async (user, result) => {
    try {
        const userFromBd = await st.checkIfUserExist(user.username)
        if (!userFromBd) {
            result({message: "User not Found", code: 404}, null);
            return;
        }
        const isValidPassword = await bcrypt.compare(user.password, userFromBd.password);
        if (!isValidPassword) {
            result({message: "username or password is incorrect", code: 400}, null);
            return;
        }
        const token = await generateAccessToken({
            id: userFromBd.id,
            username: userFromBd.username,
            email: userFromBd.email,
            isAdmin: userFromBd.isAdmin
        });
        result(null, token);
    } catch (e) {
        result({message: e}, null);
    }
}

exports.getAllUsers = async (result) => {
    try {
        const users = await st.getAllUsers();
        result(null, users)
    } catch (e) {
        result({message: e}, null);
    }
}

exports.getUser = async (userId, result) => {
    try {
        const user = await st.getUser(userId);
        if (!user) {
            result({message: "Not found", code: 404}, null);
            return;
        }
        result(null, user)
    } catch (e) {
        result({message: e}, null);
    }
}

exports.deleteUser = async (userId, result) => {
    try {
        const user = await st.deleteUser(userId);
        if (!user) {
            result({message: "User not found", code: 404}, null);
            return;
        }
        result(null)
    } catch (e) {
        result({message: e}, null);
    }
}

exports.createUser = async (user, result) => {
    try {
        const exist = await st.checkIfUserExist(user.username)
        if (exist) {
            result({message: "User already exists", code: 400}, null);
            return;
        }
        user.password = await hashData(user.password);
        await st.createNewUser(user)
        await sendEmail(user.email, user.username)
        result(null, {success: true});
    } catch (e) {
        result({message: e}, null);
    }
}

exports.updateUser = async (id, user, result) => {
    try {
        const exist = await st.checkIfUserExistById(id)
        if (!exist) {
            result({message: "User not found", code: 404}, null);
            return;
        }
        user.password = await hashData(user.password);
        await st.updateUserData(user)
        result(null, {success: true});
    } catch (e) {
        result({message: e}, null);
    }
}
