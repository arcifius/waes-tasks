module.exports = {
    setupFiles: [`<rootDir>/jest.setup.js`],
    testPathIgnorePatterns: [`<rootDir>/.next/`, `<rootDir>/node_modules/`],
    collectCoverageFrom: [`<rootDir>/components/**`, `<rootDir>/pages/*`, `!<rootDir>/pages/_document.js`],
    moduleDirectories: [
        `./`,
        `node_modules`,
    ],
};
