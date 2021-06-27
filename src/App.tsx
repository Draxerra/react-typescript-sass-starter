import { FC } from "react";

import store from "./store";
import { Provider } from "react-redux";

import Counter from "./components/Counter";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
