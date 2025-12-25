const puppeteer = require("puppeteer");
const scrapeCategory = require("./scrapeCategory");
const scrapeProduct = require("./scrapeProduct");
const MyntraProduct = require("../models/productSchema");

const CATEGORY_URL = "https://www.myntra.com/men-jeans";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const scrapeAllData = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined,
      });
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
    );

    console.log("Opening category page...");
    const productUrls = await scrapeCategory(page, CATEGORY_URL);
    console.log(`Total products found: ${productUrls.length}`);

    for (const url of productUrls) {
      try {
        console.log("Scraping:", url);

        const productData = await scrapeProduct(browser, url);
        if (!productData || !productData.productCode) continue;

        const exists = await MyntraProduct.findOne({
          productCode: productData.productCode,
        }).lean();

        if (exists) {
          console.log("Already exists:", productData.productCode);
          continue;
        }

        await MyntraProduct.create(productData);
        console.log("Saved:", productData.productName);

        await delay(3000);
      } catch (err) {
        console.error("Product failed:", err.message);
      }
    }

    console.log("Scraping completed");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeAllData;

