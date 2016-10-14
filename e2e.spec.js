const path = require('path');
// const assert = require('yeoman-assert');
const child = require('child_process');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

const url = 'http://localhost:8080';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000; //increase timeout to allow webpack finish its thing

let $;
let npmTask;

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
          driver.get(url);
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
