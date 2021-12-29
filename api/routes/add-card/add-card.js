const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../database/database.json");

router.post("/addcard", async (req, res, next) => {
  try {
    const { cardName } = req.query;
    const data = JSON.parse(fs.readFileSync(filePath));
    data[0].cards.push({ name: cardName });
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
