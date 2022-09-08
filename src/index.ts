import { timeout } from "./helpers";
import { launchBrowserPage } from "./infra";
import { FullFlow } from "./flows";
import { logins } from "./logins";

(async function () {
  let errors = [];

  for (const login of logins) {
    const { browser, page } = await launchBrowserPage();

    try {
      const flow = new FullFlow(login);

      await Promise.race([flow.run(page), timeout(logins.length * 60_000)]);
    } catch (e) {
      errors.push(e);
    } finally {
      if (!page.isClosed()) {
        await page.close();
      }

      if (browser.isConnected()) {
        await browser.close();
      }
    }
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(error);
    }
  }

  process.exit(errors.length > 0 ? 127 : 0);
})();
