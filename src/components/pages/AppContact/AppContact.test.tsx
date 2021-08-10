import AppContact from "./AppContact";
import { render } from "@testing-library/react";

describe("App Contact", () => {
  it("should match snapshot", () => {
    const contact = render(<AppContact />).asFragment();
    expect(contact).toMatchSnapshot();
  });
});
