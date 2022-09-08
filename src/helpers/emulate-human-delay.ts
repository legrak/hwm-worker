import { randomIntFromInterval } from "./random";
import { timeout } from "./timeout";

const minHumanDelayEmulationTimeMs = 0_500;
const maxHumanDelayEmulationTimeMs = 2_000;

export async function emulateHumanDelay(): Promise<void> {
  await timeout(
    randomIntFromInterval(
      minHumanDelayEmulationTimeMs,
      maxHumanDelayEmulationTimeMs
    )
  );
}
