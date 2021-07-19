import { FC } from "react";

import store from "./store";
import { Provider } from "react-redux";

import AppTemplate from "./components/templates/AppTemplate";

const App: FC = () => (
  <Provider store={store}>
    <AppTemplate />
  </Provider>
);

export default App;
