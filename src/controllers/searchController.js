const searchService = require("../services/ytService");
const scrapeService = require("../services/scrapeService");

let scrapeSwitch = false;

const search = (req, res) => {
	const string = req.params.search;

	if (scrapeSwitch) {
		scrapeService.getSearchResults(string).then((docs) => {
			if (docs.error) {
				res
					.status(500)
					.json({ message: "something went wrong with the scraper" });
			} else {
				res.status(200).json(docs);
			}
		});
	} else {
		searchService.search(string).then((docs) => {
			if (docs.status == 200) {
				res.status(200).json(docs.data);
			} else if (docs.status == 403) {
				res.status(403).json(docs.data);
				scrapeSwitch = true;
			} else {
				res.status(docs.status).json(docs.data);
			}
		});
	}
};

module.exports = { search };
