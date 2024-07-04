import { Outlet } from "react-router-dom";

import styles from "./layout.module.scss";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__sidebar}>
        <Sidebar />
      </div>
      <div className={styles.layout__content}>
        <div className={styles.layout__title}>Hello Evano 👋🏼</div>
        <Outlet />
      </div>
    </div>
  );
};
