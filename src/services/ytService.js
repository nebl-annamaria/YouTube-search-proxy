const axios = require("axios");
require("dotenv").config();

const keys = [process.env.KEY_1, process.env.KEY_2];

const keyProvider = (function () {
  let i = 0;

  return function () {
    if (i == keys.length - 1) {
      i = 0;
      return i;
    } else {
      i++;
      return i;
    }
  };
})();

const search = async (param) => {
  try {
    const myKey = keyProvider();
    const res = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: param,
          maxResults: 10,
          type: "video",
          videoEmbeddable: "true",
          key: keys[myKey],
        },
      }
    );

    const items = res.data.items;

    let data = [];

    for (item of items) {
      let thumbnail = item.snippet.thumbnails.high.url;
      let title = item.snippet.title;
      let id = item.id.videoId;

      data.push({ thumbnail: thumbnail, title: title, id: id });
    }

    const response = { status: 200, data: data };
    return response;
  } catch (error) {
    if (error.response) {
      const response = {
        status: error.response.status,
        data: error.message,
      };
      return response;
    } else if (error.request) {
      const response = {
        status: 502,
        data: "bad gateway",
      };
      return response;
    } else {
      const response = {
        status: 500,
        data: "something went wrong with the YT api service",
      };
      return response;
    }
  }
};

module.exports = { search };
