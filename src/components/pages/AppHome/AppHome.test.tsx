import AppHome from "./AppHome";
import { renderWithRedux } from "~/utils/renderWithRedux";
import userEvent from "@testing-library/user-event";

import counter from "~/store/counter";
import * as counterActions from "~/store/counter";

describe("App Home", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const home = renderWithRedux(<AppHome />, {
      reducers: { counter },
    }).asFragment();
    expect(home).toMatchSnapshot();
  });

  it("should display count from store", () => {
    const { getByText } = renderWithRedux(<AppHome />, {
      reducers: { counter },
      preloadedState: { counter: { value: 500 } },
    });
    expect(getByText("Current Count: 500")).toBeTruthy();
  });

  it("should fire increment action", () => {
    const { getByText } = renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const spy = jest.spyOn(counterActions, "increment");
    const incrementBtn = getByText("Increment");
    userEvent.click(incrementBtn);
    expect(spy).toHaveBeenCalled();
  });

  it("should increment on click", () => {
    const { getByText } = renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const incrementBtn = getByText("Increment");
    userEvent.click(incrementBtn);
    expect(getByText("Current Count: 1")).toBeTruthy();
  });

  it("should fire decrement action", () => {
    const { getByText } = renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const spy = jest.spyOn(counterActions, "decrement");
    const decrementBtn = getByText("Decrement");
    userEvent.click(decrementBtn);
    expect(spy).toHaveBeenCalled();
  });

  it("should decrement on click", () => {
    const { getByText } = renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const decrementBtn = getByText("Decrement");
    userEvent.click(decrementBtn);
    expect(getByText("Current Count: -1")).toBeTruthy();
  });
});
