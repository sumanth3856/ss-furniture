import type { Config } from "jest";

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { 
      tsconfig: "tsconfig.json",
      isolatedModules: true,
      diagnostics: false,
    }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lucide-react)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**",
  ],
  maxWorkers: 1,
  workerIdleMemoryLimit: "256MB",
  testTimeout: 10000,
  forceExit: true,
  detectOpenHandles: false,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  injectGlobals: true,
};

export default config;
