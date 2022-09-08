import { Page } from "playwright-core";
import { UserLogin } from "../types";
import { Flow } from "./flow";
import { LoginFlow } from "./login-flow";
import { StartWorkingFlow } from "./start-working-flow";

export class FullFlow implements Flow {
  private loginFlow: Flow;
  private startWorkingFlow: Flow;

  constructor(login: UserLogin) {
    this.loginFlow = new LoginFlow(login);
    this.startWorkingFlow = new StartWorkingFlow();
  }

  public async run(page: Page) {
    await this.loginFlow.run(page);
    await this.startWorkingFlow.run(page);
  }
}
