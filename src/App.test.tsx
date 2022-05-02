import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const spy = jest.spyOn(console, "error");
  render(<App />);
  expect(spy).not.toBeCalled();
});
