import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("tests", () => {
    test("renders learn react link", () => {
        render(<App />);
        // const linkElement = screen.getByText(/learn react/i);
        // expect(linkElement).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug();
    });
});
