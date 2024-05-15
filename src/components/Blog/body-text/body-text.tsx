import { FC, PropsWithChildren } from "react";
import styles from "./body-text.module.scss";

const BodyText: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default BodyText;
