const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
/*
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load raw HTML
    const html = `<ul><li>Item 1</li><li>Item 2</li></ul>`;
    await page.setContent(html);

    // Manipulate the DOM
    const items = await page.$$eval('li', li => li.map(item => item.textContent));
    console.log(items); // Logs ["Item 1", "Item 2"]

    // You can modify and add elements
    await page.evaluate(() => {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        li.textContent = 'Item 3';
        ul.appendChild(li);
    });

    // Get updated HTML
    const updatedHtml = await page.content();
    console.log(updatedHtml);

    await browser.close();
})();
*/

let browser;
let page;

// Function to write data to a file
function writeToFile(fileName, data) {
    const filePath = path.join(__dirname, fileName);
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to file ${fileName}:`, err);
            return;
        }
        console.log(`Data written to file ${fileName}`);
    });
}

// Function to read data from a file
function readFromFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading from file ${fileName}:`, err);
            return;
        }
        console.log(`Data read from file ${fileName}:\n${data}`);
    });
}
async function loadBrowser(html) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setContent(html);
}
async function closeBrowser() {
    writeToFile('index.html', await page.content())
    await browser.close();
}
async function runCode(code) {
    await page.evaluate(() => {
        eval(code)
    })
}
module.exports = { loadBrowser, closeBrowser, runCode, page }