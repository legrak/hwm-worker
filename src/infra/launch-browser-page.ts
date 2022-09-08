import { Browser, chromium, Page } from "playwright-core";

export async function launchBrowserPage(): Promise<{
  browser: Browser;
  page: Page;
}> {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  return {
    browser,
    page,
  };
}
