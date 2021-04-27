# YouTube search proxy

This proxy server can handle search reqests to the YouTube Data API.
It rotates the given API keys, until one of them reaches the daily quota (100 request).
After that, it switches to a Puppeteer scraper.
