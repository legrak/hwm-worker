import { Page } from "playwright-core";

export interface Flow {
  run(page: Page): Promise<void>;
}
