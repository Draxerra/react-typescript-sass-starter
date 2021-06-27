import { FC } from "react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "~/store";
import { decrement, increment } from "~/store/counter";

import AppCounter from "~/components/molecules/AppCounter";

type AppHomeProps = React.HTMLAttributes<HTMLDivElement>;
const AppHome: FC<AppHomeProps> = ({ className, ...props }) => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div {...props} className={classNames(className, "app-home")}>
      <AppCounter
        decrement={() => dispatch(decrement())}
        increment={() => dispatch(increment())}
      >
        {count}
      </AppCounter>
    </div>
  );
};

export default AppHome;
