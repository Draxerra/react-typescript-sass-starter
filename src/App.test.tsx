import App from "./App";
import { render } from "@testing-library/react";

describe("App", () => {
  it("should match snapshot", () => {
    const app = render(<App />).asFragment();
    expect(app).toMatchSnapshot();
  });
});
