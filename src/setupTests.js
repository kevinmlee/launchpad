// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util'

// @see https://github.com/nock/nock/issues/2397
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.fetch = fetch
global.scrollTo = jest.fn()
global.__incrementalCache = {
  requestHeaders: {
    'user-agent': ''
  }
}

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};