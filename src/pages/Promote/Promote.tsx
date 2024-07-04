import classNames from "classnames";
import styles from "../Home/home.module.scss";

export const Promote = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__header}>
        <div className={styles.home__info}>
          <div className={styles.home__title}>Promote</div>
          <div className={classNames(styles.home__label, styles.home__label_black)}>
            No content
          </div>
        </div>
      </div>
    </div>
  );
};
