# YouTube search proxy

This proxy server can handle search reqests to the YouTube Data API.
It rotates the given API keys, until one of them reaches the daily quota (100 request).
After that, it switches to a Puppeteer scraper.

## usage

clone the repository

place your [YouTube API keys][1] in .env file

[1]: https://developers.google.com/youtube/v3/getting-started

run `docker-compose up`

run `curl http://localhost:4000/aerosmith`

multiple instances with load balancing:

run `docker-compose up --scale server=3`

benchmark:

`ab -c 3 -n 9 http://localhost:4000/aerosmith`
