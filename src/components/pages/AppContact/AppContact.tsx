import { FC } from "react";

type AppContactProps = JSX.IntrinsicElements["div"];
const AppContact: FC<AppContactProps> = ({ ...props }) => (
  <div {...props}>Contact Page</div>
);

export default AppContact;
