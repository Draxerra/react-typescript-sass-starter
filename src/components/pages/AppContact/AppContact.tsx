import { FC } from "react";
import classNames from "classnames";

type AppContactProps = JSX.IntrinsicElements["div"];
const AppContact: FC<AppContactProps> = ({ className, ...props }) => (
  <div {...props} className={classNames(className)}>
    Contact Page
  </div>
);

export default AppContact;
