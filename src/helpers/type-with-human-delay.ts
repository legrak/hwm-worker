import { Page } from "playwright-core";
import { randomIntFromInterval } from "./random";

const minTypingDelayMs = 0_100;
const maxTypingDelayMs = 0_300;

export async function typeWithHumanDelay(
  page: Page,
  selector: string,
  text: string
): Promise<void> {
  await page.type(selector, text, {
    delay: randomIntFromInterval(minTypingDelayMs, maxTypingDelayMs),
  });
}
