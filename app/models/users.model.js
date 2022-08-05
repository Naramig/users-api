const bcrypt = require("bcrypt");
const log = require("winston-color");

const st = require('../storages/users.storage');
const {hashData, sendEmail, generateAccessToken} = require("../helpers/utils");

exports.signUp = async (user, result) => {
    try {
        log.info("signUp method is called");
        const exist = await st.checkIfUserExist(user.username)
        if (exist) {
            log.warn(`User with username ${user.username} already exists`)
            result({message: "User already exists", code: 409}, null);
            return;
        }
        user.password = await hashData(user.password);
        await st.createNewUser(user)
        await sendEmail(user.email, user.username)
        result(null, {success: true});
    } catch (e) {
        log.error(`Error in signUp method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}

exports.signIn = async (user, result) => {
    try {
        log.info("signIn method is called");
        const userFromBd = await st.checkIfUserExist(user.username)
        if (!userFromBd) {
            log.warn(`User with username ${user.username} not found`)
            result({message: "User not Found", code: 404}, null);
            return;
        }
        const isValidPassword = await bcrypt.compare(user.password, userFromBd.password);
        if (!isValidPassword) {
            log.warn(`username or password are incorrect`)
            result({message: "username or password are incorrect", code: 400}, null);
            return;
        }
        const token = await generateAccessToken({
            id: userFromBd.id,
            username: userFromBd.username,
            email: userFromBd.email,
            isAdmin: userFromBd.isAdmin
        });
        result(null, {success: true, token});
    } catch (e) {
        log.error(`Error in signIn method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}

exports.getAllUsers = async (result) => {
    try {
        const users = await st.getAllUsers();
        result(null, {success: true, users})
    } catch (e) {
        log.error(`Error in getAllUsers method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}

exports.getUser = async (userId, result) => {
    try {
        const user = await st.getUser(userId);
        if (!user) {
            result({message: "Not found", code: 404}, null);
            return;
        }
        result(null, {success: true, user})
    } catch (e) {
        log.error(`Error in getUser method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}

exports.deleteUser = async (userId, result) => {
    try {
        const user = await st.deleteUser(userId);
        if (!user) {
            result({message: "User not found", code: 404}, null);
            return;
        }
        result(null, {success: true})
    } catch (e) {
        log.error(`Error in deleteUser method: ${e}`)
        result({message: 'Internal Server Error'}, null);
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
        log.error(`Error in createUser method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}

exports.updateUser = async (id, user, result) => {
    try {
        const exist = await st.checkIfUserExistById(id)
        if (!exist) {
            result({message: "User not found", code: 404}, null);
            return;
        }
        if (user.password) {
            user.password = await hashData(user.password);
        }
        await st.updateUserData(id, user)
        result(null, {success: true});
    } catch (e) {
        log.error(`Error in updateUser method: ${e}`)
        result({message: 'Internal Server Error'}, null);
    }
}
