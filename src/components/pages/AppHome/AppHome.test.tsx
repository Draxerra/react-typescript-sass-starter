import AppHome from "./AppHome";
import { screen, renderWithRedux } from "~/utils/renderWithRedux";
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
    renderWithRedux(<AppHome />, {
      reducers: { counter },
      preloadedState: { counter: { value: 500 } },
    });
    expect(screen.getByText("Current Count: 500")).toBeInTheDocument();
  });

  it("should fire increment action", () => {
    renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const spy = jest.spyOn(counterActions, "increment");
    const incrementBtn = screen.getByText("Increment");
    userEvent.click(incrementBtn);
    expect(spy).toHaveBeenCalled();
  });

  it("should increment on click", () => {
    renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const incrementBtn = screen.getByText("Increment");
    userEvent.click(incrementBtn);
    expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
  });

  it("should fire decrement action", () => {
    renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const spy = jest.spyOn(counterActions, "decrement");
    const decrementBtn = screen.getByText("Decrement");
    userEvent.click(decrementBtn);
    expect(spy).toHaveBeenCalled();
  });

  it("should decrement on click", () => {
    renderWithRedux(<AppHome />, {
      reducers: { counter },
    });
    const decrementBtn = screen.getByText("Decrement");
    userEvent.click(decrementBtn);
    expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
  });
});
