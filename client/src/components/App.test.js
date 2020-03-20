import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders get started", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Get Started/i);
  expect(linkElement).toBeInTheDocument();
});
