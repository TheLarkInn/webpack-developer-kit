const path = require('path');
const child = require('child_process');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000; //increase timeout to allow webpack finish its thing

const URL = 'http://localhost:8080';

let $;
let npmTask;
let driver;

if (process.env.SAUCE_USERNAME !== undefined) {
  driver = new webdriver.Builder()
    .usingServer('http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub')
    .withCapabilities({
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      browserName: 'chrome',
    })
    .build();
} else {
  driver = new webdriver.Builder()
    .withCapabilities({
      browserName: 'chrome',
    })
    .build();
}

describe('Webpack Dev Kit - Dev Script', () => {
  beforeAll((done) => {
    //start the npm script
    npmTask = child.spawn('npm', ['run', 'dev']);
    let run = false; //make sure to only call done once
    npmTask.stdout.on('data', (data) => {
      //search for 'bundle valid' string to make sure it's finished running
      let str = data.toString();
      if (str.indexOf('webpack: bundle is now VALID.') !== -1) {
        if (!run) {
          run = true;
          driver.get(URL);
          driver.getPageSource()
            .then(page => {
              $ = cheerio.load(page);
              done();
            });
        }
      }
    });
  });

  afterAll((done) => {
    driver.quit().then(() => {
      //  make sure to kill npm child process
      //  otherwise it will keep running
      npmTask.kill();
      done();
    });
  });

  it('should have the title "Webpack Developer Kit"', (done) => {
    expect($('title').text()).toBe('Webpack Developer Kit');
    done();
  });

  it('should have a car.bundle.js', (done) => {
    expect($('script').attr('src')).toBe('car.bundle.js');
    done();
  });
});
