const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function scrapeCategory(page, categoryUrl) {
  console.log("Opening Myntra category page...");

  await page.goto(categoryUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const blocked = await page.evaluate(
    () =>
      document.body.innerText.includes("Access Denied") ||
      document.body.innerText.includes("Something went wrong")
  );

  if (blocked) {
    throw new Error("Blocked by Myntra on category page");
  }

  let prevHeight = 0;

  for (let i = 0; i < 12; i++) {
    const height = await page.evaluate(() => document.body.scrollHeight);
    if (height === prevHeight) break;

    prevHeight = height;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await delay(2000);
  }

  const productLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href*='/buy']"))
      .map((a) => a.href)
      .filter(Boolean)
  );
  //   console.log(productLinks);

  console.log(`Found ${productLinks.length} product URLs`);
  console.log([...new Set(productLinks)]);
  return [...new Set(productLinks)];
}

module.exports = scrapeCategory;
