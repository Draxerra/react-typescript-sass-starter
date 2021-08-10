import { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./AppTemplate.module.scss";

import AppNav from "~/components/organisms/AppNav";
import AppHome from "~/components/pages/AppHome";

const AppContact = lazy(
  () =>
    import(/* webpackChunkName: "contact" */ "~/components/pages/AppContact")
);
const renderLoader = () => <div>Loading...</div>;

const AppTemplate: FC = () => (
  <Router>
    <div className={styles["app-template"]}>
      <AppNav />
      <main className={styles["app-template__main"]}>
        <Switch>
          <Route exact path="/">
            <AppHome />
          </Route>
          <Route path="/contact">
            <Suspense fallback={renderLoader()}>
              <AppContact />
            </Suspense>
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);

export default AppTemplate;
