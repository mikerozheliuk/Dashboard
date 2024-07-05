import { useCallback } from "react";
import styles from "./home.module.scss";

import { rows } from "../TablePage/data";
import { useTable, MyTable } from "../../components/Table";

export const Home = () => {
  const { state, dispatch } = useTable(rows as unknown as []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH", search: event.target.value });
      dispatch({ type: "FILTER_ROWS" });
    },
    [dispatch]
  );

  return (
    <div className={styles.home}>
      <div className={styles.home__header}>
        <div className={styles.home__info}>
          <div className={styles.home__title}>All Customers</div>
          <div className={styles.home__label}>Active Members</div>
        </div>
        <div className={styles.home__search}>
          <input
            className={styles.home__input}
            type="search"
            placeholder="Search"
            value={state.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className={styles.home__table}>
        <MyTable {...{ state, dispatch }} />
      </div>
    </div>
  );
};
