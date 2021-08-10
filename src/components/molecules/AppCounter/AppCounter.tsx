import { FC } from "react";
import classNames from "classnames";

import styles from "./AppCounter.module.scss";

import AppButton from "~/components/atoms/AppButton";

type AppCounterProps = {
  decrement: () => void;
  increment: () => void;
} & JSX.IntrinsicElements["div"];

const AppCounter: FC<AppCounterProps> = ({
  decrement,
  increment,
  children,
  className,
  ...props
}) => (
  <div {...props} className={classNames(className, styles["app-counter"])}>
    <span className={styles["app-counter__text"]}>
      Current Count: {children}
    </span>
    <AppButton aria-label="Increment value" onClick={increment}>
      Increment
    </AppButton>
    <AppButton aria-label="Decrement value" onClick={decrement}>
      Decrement
    </AppButton>
  </div>
);
export default AppCounter;
