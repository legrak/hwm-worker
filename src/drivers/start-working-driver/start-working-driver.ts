import { Page } from "playwright-core";
import { runWithHumanDelayEmulation } from "../../helpers";
import { selectors } from "./selectors";
import { JobInfo } from "./types";

export class StartWorkingDriver {
  constructor(private page: Page) {}

  public async notWorkingHintShown(): Promise<boolean> {
    const notWorkingHint = await this.page.$(selectors.notWorkingHint);
    return notWorkingHint !== null;
  }

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

  public async getAvailableJobsList(): Promise<JobInfo[]> {
    const jobItems = await this.page.$$(selectors.jobsItems);

    return await Promise.all(
      jobItems.map((item, index) => {
        return new Promise<JobInfo>((resolve) => {
          (async function () {
            const priceItem = await item.$(selectors.jobPrice);
            const priceInnerText = await priceItem?.innerText();
            const price = Number(priceInnerText);

            const linkItem = await item.$(selectors.jobLink);
            const linkText = await linkItem?.innerText();
            const isAvailable = linkText?.trim() === "»»»";

            resolve({ isAvailable, price, index });
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
