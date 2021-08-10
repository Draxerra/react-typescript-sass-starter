import { FC } from "react";

import { useAppDispatch, useAppSelector } from "~/store";
import { decrement, increment } from "~/store/counter";

import AppCounter from "~/components/molecules/AppCounter";

type AppHomeProps = JSX.IntrinsicElements["div"];
const AppHome: FC<AppHomeProps> = ({ ...props }) => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div {...props}>
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
