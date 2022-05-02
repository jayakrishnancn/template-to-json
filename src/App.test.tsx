import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("Check for 2 upload buttons and 3 export buttons", () => {
    render(<App />);
    expect(
      screen.getAllByRole("button", {
        name: "Upload",
      }).length
    ).toBe(2);
  });
});
