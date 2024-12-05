import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "jest-playwright-preset",
  testEnvironment: "jest-playwright-preset",
  testMatch: ["**/test/playwright/**/*.[jt]s?(x)"], // Match only Playwright tests
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/jest/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};

export default config;
