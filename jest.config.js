module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/jest"],
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};
