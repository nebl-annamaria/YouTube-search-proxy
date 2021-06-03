const express = require("express");
const searchController = require("./controllers/searchController");
const app = express();
const scrapeService = require("./services/scrapeService");
var queue = require("express-queue");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = 3000;

scrapeService.initialize();

app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

app.get("/:search", function (req, res) {
  searchController.search(req, res);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
