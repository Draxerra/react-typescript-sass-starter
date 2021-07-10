import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["e2e"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "~/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  resetMocks: true,
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}",
  ],
};

export default config;
