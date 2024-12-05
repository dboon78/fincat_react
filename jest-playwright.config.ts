import type { JestPlaywrightConfig } from "jest-playwright-preset";

const config: JestPlaywrightConfig = {
  browsers: ["chromium", "firefox"],
  // Any additional configuration you need
};

export default config;
