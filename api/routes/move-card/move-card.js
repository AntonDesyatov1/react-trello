const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../database/database.json");

router.post("/movecard", async (req, res, next) => {
  try {
    const { fromId, toId, cardId } = req.query;
    const [columnIndex, cardIndex] = cardId.split("");
    console.log(columnIndex, cardIndex);
    console.log(fromId, toId);
    let data = JSON.parse(fs.readFileSync(filePath));
    const cardToMove = data[columnIndex].cards[cardIndex];
    //remove card from column from which it has been moved
    data[fromId].cards = data[fromId].cards.filter(
      (card, index) => index !== +cardIndex
    );
    console.log(data);
    //add moved card to new column
    data[toId].cards.push(cardToMove);
    console.log(data);
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
    res.status(200);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
