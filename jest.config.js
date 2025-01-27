/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  maxWorkers: 1,
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};