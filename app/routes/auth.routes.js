module.exports = app => {
    const users = require("../controllers/users.controllers");
  
    const router = require("express").Router();
    // app.use('/auth/', router);  // TODO configure swagger-autogen to see this

    // registration
    router.post("/auth/signUp", users.signUp);
    // authentication
    router.post("/auth/signIn", users.signIn);
  
  };
  