FROM buildkite/puppeteer:v1.7.0

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY korekuta.js korekuta.js

ENTRYPOINT [ "npm", "run", "start" ]

EXPOSE 3000