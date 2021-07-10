import { FC } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

type RenderParams = Parameters<typeof render>;
type Render = ReturnType<typeof render>;
type StoreParams = Parameters<typeof configureStore>;
type Store = ReturnType<typeof configureStore>;

type RenderWithReduxOptions = {
  preloadedState?: StoreParams[0]["preloadedState"];
  reducers: StoreParams[0]["reducer"];
  store?: Store;
} & RenderParams[1];

const renderWithRedux: (
  ui: RenderParams[0],
  opts: RenderWithReduxOptions
) => Render = (
  ui,
  {
    preloadedState = {},
    reducers,
    store = configureStore({ reducer: reducers, preloadedState }),
    wrapper: WrapperElement,
    ...renderOptions
  }
) => {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>
      {WrapperElement ? <WrapperElement>{children}</WrapperElement> : children}
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { renderWithRedux };
