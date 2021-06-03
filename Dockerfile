FROM alpine:edge

WORKDIR /code
COPY package*.json ./

RUN apk add --no-cache \
      chromium \
      nodejs npm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm install
RUN npm install -g nodemon

COPY . .
EXPOSE 3000
CMD [ "nodemon" , "src/index.js" ]
