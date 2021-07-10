import AppCounter from "./AppCounter";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App Counter", () => {
  it("should match snapshot", () => {
    const decrement = jest.fn();
    const increment = jest.fn();
    const counter = render(
      <AppCounter decrement={decrement} increment={increment}>
        10
      </AppCounter>
    ).asFragment();
    expect(counter).toMatchSnapshot();
  });

  it("should fire decrement on counter-decrement click", () => {
    const decrement = jest.fn();
    const increment = jest.fn();
    render(
      <AppCounter decrement={decrement} increment={increment}>
        10
      </AppCounter>
    );
    const decrementBtn = screen.getByText("Decrement");
    userEvent.click(decrementBtn);
    expect(decrement).toHaveBeenCalledTimes(1);
  });

  it("should fire icrement on counter-icrement click", () => {
    const decrement = jest.fn();
    const increment = jest.fn();
    render(
      <AppCounter decrement={decrement} increment={increment}>
        10
      </AppCounter>
    );
    const incrementBtn = screen.getByText("Increment");
    userEvent.click(incrementBtn);
    expect(increment).toHaveBeenCalledTimes(1);
  });
});
