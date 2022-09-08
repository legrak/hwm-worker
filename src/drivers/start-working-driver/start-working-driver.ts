import { Page } from "playwright-core";
import { runWithHumanDelayEmulation } from "../../helpers";
import { selectors } from "./selectors";
import { AvailableJobInfo } from "./types";

export class StartWorkingDriver {
  constructor(private page: Page) {}

  public async goToMap() {
    await runWithHumanDelayEmulation([
      async () => {
        await this.page.click(selectors.map);
      },
    ]);
  }

  public async goToManufacturingJobs() {
    await this.page.click(selectors.manufacturingJobsList);
  }

  public async goToProcessingJobs() {
    await this.page.click(selectors.processingJobsList);
  }

  public async goToMiningJobs() {
    await this.page.click(selectors.miningJobsList);
  }

  public async getAvailableJobsList(): Promise<AvailableJobInfo[]> {
    const availableJobsPrices = await this.page.$$(
      selectors.availableJobPrices
    );

    return await Promise.all(
      availableJobsPrices.map((item, index) => {
        return new Promise<AvailableJobInfo>((resolve) => {
          (async function () {
            const price = await item.textContent();

            resolve({ price: Number(price), index });
          })();
        });
      })
    );
  }

  public async goToJob(index: number) {
    const jobsLinks = await this.page.$$(selectors.availableJobLinks);
    const desiredJobLink = jobsLinks[index];
    if (!desiredJobLink) {
      throw Error("there is no specified job available");
    }

    await desiredJobLink.click();
  }

  public async startWorking() {
    await this.page.click(selectors.startWorkingButton, {
      timeout: 2000,
    });
  }
}
