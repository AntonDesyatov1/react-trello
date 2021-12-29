const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../database/database.json");

router.delete("/removecard", async (req, res, next) => {
  try {
    const { cardIndex, columnIndex } = req.query;
    const data = JSON.parse(fs.readFileSync(filePath)).map((column, index) => {
      if (index !== +columnIndex) {
        return column;
      }

      return {
        ...column,
        cards: column.cards.filter((card, index) => index !== +cardIndex),
      };
    });

    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
