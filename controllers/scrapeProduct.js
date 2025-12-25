const buildGlobalKey = require("../utils/buildGlobalKey.JS");
const scrapeProduct = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
  await page.waitForSelector(".pdp-description-container", { timeout: 20000 });

  const data = await page.evaluate(() => {
    const brand = document.querySelector(".pdp-title")?.innerText.trim();
    const productName = document.querySelector(".pdp-name")?.innerText.trim();

    const price =
      Number(
        document
          .querySelector(".pdp-price strong")
          ?.innerText.replace(/[^\d]/g, "")
      ) || null;

    const mrp =
      Number(
        document
          .querySelector(".pdp-mrp s")
          ?.innerText.replace(/[^\d]/g, "")
      ) || null;

    const discount =
      document.querySelector(".pdp-discount")?.innerText.trim() || null;

    const rating =
      Number(
        document.querySelector(".index-overallRating > div")?.innerText
      ) || null;

    const ratingCount =
      document.querySelector(".index-ratingsCount")?.innerText.trim() || null;

    const images = Array.from(document.querySelectorAll(".image-grid-image"))
      .map((el) =>
        el.style.backgroundImage
          .replace('url("', "")
          .replace('")', "")
      )
      .filter(Boolean);

    const sizes = Array.from(
      document.querySelectorAll(".size-buttons-unified-size")
    ).map((el) => el.innerText.trim());

    const highlights = Array.from(
      document.querySelectorAll(".pdp-product-description-content ul li")
    ).map((li) => li.innerText.trim());

    const sizeFit =
      document.querySelector(".pdp-sizeFitDescContent")
        ?.innerText.trim() || null;

    const materialCare =
      document.querySelectorAll(".pdp-sizeFitDescContent")[1]
        ?.innerText.trim() || null;

    const specifications = [];
    document.querySelectorAll(".index-row").forEach((row) => {
      const key = row.querySelector(".index-rowKey")?.innerText.trim();
      const value = row.querySelector(".index-rowValue")?.innerText.trim();
      if (key && value) specifications.push({ key, value });
    });

    const productCode =
      document.querySelector(".supplier-styleId")?.innerText.trim();

    return {
      brand,
      productName,
      price,
      mrp,
      discount,
      rating,
      ratingCount,
      images,
      sizes,
      highlights,
      sizeFit,
      materialCare,
      specifications,
      productCode,
      productUrl: window.location.href,
    };
  });

  await page.close();

  if (!data || !data.productCode) return null;


  const globalProductKey = buildGlobalKey({
    brand: data.brand,
    productName: data.productName,
  });

  return {
    ...data,
    globalProductKey,
  };
};

module.exports = scrapeProduct;
