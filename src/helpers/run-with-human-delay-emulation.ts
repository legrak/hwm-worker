import { emulateHumanDelay } from "./emulate-human-delay";

export async function runWithHumanDelayEmulation(
  steps: (() => Promise<void>)[]
) {
  for (const step of steps) {
    await emulateHumanDelay();
    await step();
  }
}
