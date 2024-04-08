import { ReactNode } from "react";
import "./Layout.scss";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
