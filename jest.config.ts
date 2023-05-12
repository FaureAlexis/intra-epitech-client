import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageProvider: 'v8',
};
export default jestConfig;
