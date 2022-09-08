import { Page } from "playwright-core";
import { runWithHumanDelayEmulation } from "../../helpers";
import { typeWithHumanDelay } from "../../helpers/type-with-human-delay";
import { selectors } from "./selectors";

export class LoginDriver {
  constructor(private page: Page) {}

  public async login(userName: string, password: string) {
    await this.page.waitForSelector(selectors.loginButton, { timeout: 5000 });

    await runWithHumanDelayEmulation([
      async () => {
        await typeWithHumanDelay(this.page, selectors.userNameField, userName);
      },
      async () => {
        await typeWithHumanDelay(this.page, selectors.passwordField, password);
      },
      async () => {
        await this.page.click(selectors.loginButton);
      },
    ]);
  }
}
