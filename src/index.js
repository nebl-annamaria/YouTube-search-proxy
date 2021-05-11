const express = require("express");
const searchController = require("./controllers/searchController");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = 3000;

app.get("/:search", function (req, res) {
  searchController.search(req, res);
});

app.listen(port, () => {
  console.log("listening on port" + port);
});
