process.env.NODE_ENV === "development";

const getCoverageOptions = () => {
  return process.env.COVERAGE === "include"
    ? {
        collectCoverage: true,
        testMatch: ["**/*.test.tsx", "**/*.test.ts"],
        coverageThreshold: {
          global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
          },
        },
        coverageDirectory: "./coverage",
      }
    : {
        collectCoverage: false,
      };
};

module.exports = {
  ...getCoverageOptions(),
  testMatch: ["**/*.test.tsx", "**/*.test.ts", "**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  modulePaths: ["src"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "\\.(scss)$": "identity-obj-proxy",
    "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/fileMock.ts",
  },
  coveragePathIgnorePatterns: [
    ".*\\.mock.ts$",
    ".*\\.module.ts$",
    ".*\\.config.ts$",
    ".*\\.models.ts$",
    "setupTests.ts",
    "index.js",
    "index.ts",
    "index.tsx",
    "/environments/",
    "/utils/",
    "/assets/",
    "/icons/",
    "/enums/",
    "/ssr/",
  ],
};
