const {authenticateToken} = require("../helpers/utils")

module.exports = app => {
    const users = require("../controllers/users.controllers");

    const router = require("express").Router();

    //get all users by admins
    router.get("/users/", authenticateToken, users.getAllUsers);
    //get user by id by admins
    router.get("/users/:id", authenticateToken, users.getUser);
    //create new user by admins
    router.post("/users/", authenticateToken, users.createUser);
    //update user by admins
    router.put("/users/:id", authenticateToken, users.updateUserById);
    //delete user by admins
    router.delete("/users/:id", authenticateToken, users.deleteUserById);

    //delete user by user
    router.delete("/users/", authenticateToken, users.deleteUser);
    //update user by user
    router.put("/users/", authenticateToken, users.updateUser);

    // app.use('/users/', router); // TODO configure swagger-autogen to see this
};