
// Mock para @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const View = require('react-native').View;
  return new Proxy({}, {
    get: (target, prop) => View
  });
});

// Mock para @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Mock para react-native-reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

