'use strict';

const puppeteer = require('puppeteer');
const path = require('path');
const config = require('./config.json');
const menu = require('./menu.json');

let browser;
let logger = console;
let accessToken;

(async () => {
    try {
        browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: [
              '--auto-open-devtools-for-tabs',
              // '--no-sandbox',
              // '--disable-setuid-sandbox',
              '--use-fake-ui-for-media-stream',
              // '--ignore-autoplay-restrictions',
              // '--mute-audio',
              // '--use-fake-device-for-media-stream',
              // '--unsafely-treat-insecure-origin-as-secure',
              // '--ignore-certificate-errors',
              // '--allow-running-insecure-content'
            ],
          });
        const page = await browser.newPage();
        await page.goto(`file:${path.join(__dirname, 'index.html')}`);
        page.on('console', (msg) => logger.log(`PAGE LOG: ${msg.text()}`));
        accessToken = await page.evaluate(async (config, menu) => {
        let client;
        let user;
        let circuitUtil;
        try {
            Circuit.logger.setLevel(Circuit.Enums.LogLevel.Error);
            client = new Circuit.Client(config.bot);
            circuitUtil = new Bot(client, config, menu);
            circuitUtil.logonBot().then(circuitUtil.updateUserData)
                .then(circuitUtil.sayHi)
                .catch(circuitUtil.terminate);
            return client.accessToken;
        } finally {
            user && await client.logout();
        }
        }, config, menu);
    } catch (err) {
      console.error(err);
    }
})();

