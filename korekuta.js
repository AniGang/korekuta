'use strict';

const MAX_TIMEOUT = 10000
const puppeteer = require('puppeteer');

var express = require('express')
var app = express()


app.get('/:distributor/:id', async function (req, res) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(MAX_TIMEOUT)

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
  });

  switch(req.params.distributor) {
    case 'anilist':
      await page.goto('https://anilist.co/anime/' + req.params.id)
        .catch(error => { console.log('rejection in goto', error.message); });
      await page.waitFor('h1', {'timeout': MAX_TIMEOUT})
        .catch(error => { console.log('rejection in goto', error.message); });
      break;
    case 'kitsu':
      await page.goto('https://kitsu.io/anime/' + req.params.id);
      await page.waitFor('h3');
      break;
    case 'mal':
      await page.goto('https://myanimelist.net/anime/' + req.params.id);
    case 'anidb':
      await page.goto('https://anidb.net/a' + req.params.id);
    default:
      res.statusCode = 404
  }
  
  let html = await page.evaluate(() => document.body.innerHTML);
  browser.close();
  res.end(html)
});


app.listen(3000)