import { FC } from "react";
import classNames from "classnames";

import AppLinkButton from "~/components/molecules/AppLinkButton";

import styles from "./AppNav.module.scss";

type AppNavProps = JSX.IntrinsicElements["nav"];
const AppNav: FC<AppNavProps> = ({ className, ...props }) => (
  <nav {...props} className={classNames(className, styles["app-nav"])}>
    <AppLinkButton to="/" exact aria-label="Navigate to Home Page">
      Home
    </AppLinkButton>
    <AppLinkButton to="/contact" aria-label="Navigate to Contact Page">
      Contact
    </AppLinkButton>
  </nav>
);

export default AppNav;
