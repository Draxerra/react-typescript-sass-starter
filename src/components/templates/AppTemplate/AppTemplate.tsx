import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./AppTemplate.module.scss";

import AppHome from "~/components/pages/AppHome";

const AppTemplate: FC = () => (
  <Router>
    <main className={styles["app-template"]}>
      <Switch>
        <Route exact path="/">
          <AppHome />
        </Route>
      </Switch>
    </main>
  </Router>
);

export default AppTemplate;
