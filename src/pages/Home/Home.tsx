import { useState } from "react";
import { TablePage } from "../TablePage/TablePage";
import styles from "./home.module.scss";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className={styles.home__table}>
        <TablePage searchQuery={searchQuery} />
      </div>
    </div>
  );
};
