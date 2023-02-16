// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import * as restHandlers from "./server/routeHandlers";

import { setupServer } from "msw/node";

export const mswServer = setupServer();

const handlers = Object.values({ ...restHandlers });

mswServer.resetHandlers(...handlers.map((handler) => handler()));

beforeAll(() => {
  // Establish requests interception layer before all tests.
  mswServer.listen();
});
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  mswServer.close();
});
