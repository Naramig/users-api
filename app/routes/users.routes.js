const {authenticateToken} = require("../helpers/utils")

module.exports = app => {
    const users = require("../controllers/users.controllers");

    const router = require("express").Router();

    //get all users by admins
    router.get("/", authenticateToken, users.getAllUsers);
    //get user by id by admins
    router.get("/:id", authenticateToken, users.getUser);
    //create new user by admins
    router.post("/", authenticateToken, users.createUser);
    //update user by admins
    router.put("/:id", authenticateToken, users.updateUserById);
    //delete user by admins
    router.delete("/:id", authenticateToken, users.deleteUserById);

    //delete user by user
    router.delete("/", authenticateToken, users.deleteUser);
    //update user by user
    router.put("/", authenticateToken, users.updateUser);

    app.use('/users/', router);
};