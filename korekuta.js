'use strict';

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

  switch(req.params.distributor) {
    case 'anilist':
    await page.goto('https://anilist.co/anime/' + req.params.id);
    break;
    case 'kitsu':
      await page.goto('https://kitsu.io/anime/' + req.params.id);
      await page.waitFor('h3');
      break;
    default:
      res.sendStatus(400)
  }
  
  
  let html = await page.evaluate(() => document.body.innerHTML);
  res.end(html)
});



app.listen(3000)