import { FC } from "react";
import classNames from "classnames";

import styles from "./AppButton.module.scss";

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const AppButton: FC<AppButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={classNames(className, styles["app-button"])}>
      {children}
    </button>
  );
};

export default AppButton;
