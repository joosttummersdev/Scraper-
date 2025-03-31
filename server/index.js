import express from "express";
import cors from "cors";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/scraper/test", async (req, res) => {
  const { username, password } = req.body;
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: "new",
    });

    const page = await browser.newPage();
    await page.goto("https://app.salesdock.nl/login", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Simulated login logic (to be replaced with actual selectors)
    console.log("Login page reached");

    res.status(200).json({ success: true, message: "Scraper simulated login." });
  } catch (err) {
    console.error("SCRAPER ERROR:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});