module.exports = {
  preset: "react-native",
  testMatch: ["**/__tests__/**/*.test.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation))"
  ],
  setupFiles: ["./jest.setup.js"]
};
