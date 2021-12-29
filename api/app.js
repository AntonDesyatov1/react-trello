const express = require("express");
const app = express();
const cors = require("cors");
const port = 9000;
const fetchBoard = require("./routes/fetch-board/fetch-board");
const addCard = require("./routes/add-card/add-card");

app.set("port", port);
app.use(cors());
app.get("/fetchboard", fetchBoard);
app.post("/addcard", addCard);
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

module.exports = app;