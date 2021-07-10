import "regenerator-runtime";

import { render } from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./index.scss";

serviceWorkerRegistration.register();

render(<App />, document.getElementById("root"));
