import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test.skip("Check for 2 upload buttons, 3 export buttons, 4 textboxes", () => {
    render(<App />);
    expect(
      screen.getAllByRole("button", {
        name: "Upload",
      }).length
    ).toBe(2);
    expect(
      screen.getAllByRole("button", {
        name: "Export",
      }).length
    ).toBe(3);
    expect(screen.getAllByRole("textbox").length).toBe(4);
  });
});
