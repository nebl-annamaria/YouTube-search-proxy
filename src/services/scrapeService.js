const browserService = require("./browserService");

async function scrape(param) {
  try {
    const myPage = await browserService.Browser.getPage();
    await myPage.goto(
      `https://www.youtube.com/results?search_query=${param} `,
      {
        waitUntil: "load",
      }
    );
    await myPage.setViewport({
      width: 1200,
      height: 3000,
    });

    await autoScroll(myPage);

    const result = await myPage.evaluate(() => {
      let elements = document.getElementsByTagName("ytd-video-renderer");

      let array = Array.from(elements).slice(0, 10);

      let data = [];

      for (element of array) {
        let thumbnail = element
          .getElementsByTagName("img")[0]
          .getAttribute("src");

        let title = element.getElementsByTagName("yt-formatted-string")[0]
          .innerText;

        let id = element
          .getElementsByTagName("ytd-thumbnail")[0]
          .getElementsByTagName("a")[0]
          .getAttribute("href")
          .slice(9);

        data.push({ thumbnail: thumbnail, title: title, id: id });
      }

      return data;
    });

    return result;
  } catch (error) {
    let result = {};
    result.error = error;
    return result;
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 5);
    });
  });
}

async function acceptCookies(page) {
  const buttonChecker = await page.evaluate(() => {
    let button = document.getElementsByClassName("VfPpkd-LgbsSe")[0];

    return button;
  });

  if (buttonChecker) {
    await Promise.all([
      page.click("button.VfPpkd-LgbsSe"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  }
}

async function initialize() {
  const myPage = await browserService.Browser.getPage();
  await myPage.goto("https://www.youtube.com/", {
    waitUntil: "load",
  });
  await acceptCookies(myPage);
}

function getSearchResults(input) {
  const searchParam = input.replace(/ /g, "+");
  return scrape(searchParam);
}

module.exports = { getSearchResults, initialize };
