const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function scrapeCategory(page, categoryUrl) {
  await page.goto(categoryUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  let prevHeight = 0;

  for (let i = 0; i < 15; i++) {
    const height = await page.evaluate(() => document.body.scrollHeight);
    if (height === prevHeight) break;
    prevHeight = height;

    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await delay(2500);
  }

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href*='/buy']"))
      .map((a) => a.href)
      .filter(Boolean)
  );

  return [...new Set(links)];
}

module.exports = scrapeCategory;
