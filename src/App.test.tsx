import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("renders the app heading", () => {
        render(<App />);
        expect(screen.getByRole("heading", { name: "Reminders" })).toBeInTheDocument();
    });
});
