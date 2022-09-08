import { Page } from "playwright-core";
import { StartWorkingDriver } from "../drivers/start-working-driver";
import {
  emulateHumanDelay,
  runWithHumanDelayEmulation,
  timeout,
} from "../helpers";
import { Flow } from "./flow";

export class StartWorkingFlow implements Flow {
  constructor() {}

  public async run(page: Page) {
    const driver = new StartWorkingDriver(page);
    await driver.goToMap();

    const possibleJobsListsNavigation = [
      async () => await driver.goToManufacturingJobs(),
      async () => await driver.goToProcessingJobs(),
      async () => await driver.goToMiningJobs(),
    ];

    let bestAvailableJobIndex: number | null = null;

    await runWithHumanDelayEmulation([
      async () => {
        for (const jobListNavigation of possibleJobsListsNavigation) {
          await jobListNavigation();

          const availableJobs = await driver.getAvailableJobsList();
          if (availableJobs.length > 0) {
            availableJobs.sort(({ price: a }, { price: b }) => {
              return b - a;
            });

            bestAvailableJobIndex = availableJobs[0].index;
            return;
          }

          await emulateHumanDelay();
        }

        throw Error("There are no jobs available");
      },
      async () => {
        if (typeof bestAvailableJobIndex === "number") {
          await driver.goToJob(bestAvailableJobIndex);
        }
      },
      async () => {
        await driver.startWorking();
      },
    ]);

    await timeout(2000);
  }
}
