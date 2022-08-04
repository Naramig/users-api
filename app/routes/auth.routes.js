module.exports = app => {
    const users = require("../controllers/users.controllers");
  
    const router = require("express").Router();
  
    // registration
    router.post("/signUp", users.signUp);
    // authentication
    router.post("/signIn", users.signIn);
  
    app.use('/auth/', router);
  };
  