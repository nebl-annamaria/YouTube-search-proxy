const puppeteer = require("puppeteer");

const Browser = (function () {
  let browser;
  async function getBrowser() {
    if (browser) {
      return browser;
    } else {
      browser = await puppeteer.launch();
      return browser;
    }
  }

  return {
    getPage: async function () {
      const mybrowser = await getBrowser();
      const page = (await mybrowser.pages())[0];
      return page;
    },
  };
})();

module.exports = { Browser };
