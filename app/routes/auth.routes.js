module.exports = app => {
    const users = require("../controllers/users.controllers");
  
    const router = require("express").Router();
    app.use('/auth/', router);  // TODO configure swagger-autogen to see this

    // registration
    router.post("/signUp", users.signUp);
    // authentication
    router.post("/signIn", users.signIn);
  
  };
  