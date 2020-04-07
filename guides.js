/* This section of code is used by the install and setup guides, if you modify it make sure you still are hosting a webpage (seen in "show") or Uptime Robot will stop working */

const express = require("express");
const router = express.Router();



router.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


router.get("/domainname", function(request, response) {
  let domain = process.env.PROJECT_DOMAIN;
  response.status(200).json({
    message: domain
  });
});


module.exports = router;
