// jest.config.js
module.exports = {
    verbose: false,
    testMatch: ['**/__tests__/**/*.(ts|js)?(x)', '**/?(*.)(spec|test).(ts|js)?(x)'], // Default [ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ]
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
};