FROM alekzonder/puppeteer:1.1.1

COPY korekuta.js /app/korekuta.js
COPY package.json /app/package.json

WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]

EXPOSE 3000