const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../database/database.json");

router.get("/fetchboard", async (req, res, next) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
