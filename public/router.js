const express = require("express");
const router = express.Router();



router.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});


router.get("/domainname", function(request, response) {
  let domain = process.env.PROJECT_DOMAIN;
  response.status(200).json({
    message: domain
  });
});


module.exports = router;
