import AppButton from "./AppButton";
import { render } from "@testing-library/react";

describe("App Button", () => {
  it("should match snapshot", () => {
    const button = render(
      <AppButton className="test">Test</AppButton>
    ).asFragment();
    expect(button).toMatchSnapshot();
  });
});
