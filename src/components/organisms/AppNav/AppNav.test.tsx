import AppNav from "./AppNav";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

describe("App Nav", () => {
  it("should match snapshot", () => {
    const nav = render(<AppNav />, { wrapper: Router }).asFragment();
    expect(nav).toMatchSnapshot();
  });
});
