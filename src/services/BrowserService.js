const puppeteer = require("puppeteer");

class Browser {
	instance;

	async getInstance() {
		if (this.instance == null) {
			this.instance = new Browser();
			await this.instance.initialise();
		}

		return this.instance;
	}

	browser;

	constructor() {}

	async getPage() {
		const page = (await this.browser.pages())[0];

		return page;
	}

	async closePage(page) {
		page.close();
	}

	async initialise() {
		this.browser = await puppeteer.launch();
	}
}

module.exports = new Browser();
