import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";

import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloseIcon from "@mui/icons-material/Close";

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  const [naw, setNav] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleNavLinkClick = () => {
    setNav(false);
  };

  return (
    <div className={styles.sidebar}>
      <div onClick={() => setNav(!naw)} className={styles.sidebar__menuBtn}>
        {naw ? <CloseIcon /> : <DensityMediumIcon />}
      </div>

      <div
        className={cn(styles.sidebar__inner, {
          [styles.activeNav]: naw,
        })}
      >
        <div className={styles.sidebar__top}>
          <NavLink
            to="#"
            className={cn(styles.sidebar__logo, styles.logo)}
            onClick={handleNavLinkClick}
          >
            <div className={styles.logo__image}>
              <img src="/src/assets/logo.svg" alt="user" />
            </div>
            <div className={styles.logo__brand}>
              Dashboard <span>v.01</span>
            </div>
          </NavLink>

          <div className={styles.sidebar__list}>
            <NavLink
              to="/dashboard"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/dashboard",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Dashboard</div>
              </div>
            </NavLink>

            <NavLink
              to="/product"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/product",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon-2.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Product</div>
              </div>
              <div className={styles.item__arrow}>
                <img src="/src/assets/sidebar/arrow.svg" alt="arrow" />
              </div>
            </NavLink>

            <NavLink
              to="/"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon-3.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Customers</div>
              </div>
              <div className={styles.item__arrow}>
                <img src="/src/assets/sidebar/arrow.svg" alt="arrow" />
              </div>
            </NavLink>

            <NavLink
              to="/income"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/income",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon-4.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Income</div>
              </div>
              <div className={styles.item__arrow}>
                <img src="/src/assets/sidebar/arrow.svg" alt="arrow" />
              </div>
            </NavLink>

            <NavLink
              to="/promote"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/promote",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon-5.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Promote</div>
              </div>
              <div className={styles.item__arrow}>
                <img src="/src/assets/sidebar/arrow.svg" alt="arrow" />
              </div>
            </NavLink>

            <NavLink
              to="/help"
              className={cn(styles.sidebar__item, styles.item, {
                [styles.active]: currentPath === "/help",
              })}
              onClick={handleNavLinkClick}
            >
              <div className={styles.item__main}>
                <div className={styles.item__icon}>
                  <img src="/src/assets/sidebar/icon-6.svg" alt="icon" />
                </div>
                <div className={styles.item__text}>Help</div>
              </div>
              <div className={styles.item__arrow}>
                <img src="/src/assets/sidebar/arrow.svg" alt="arrow" />
              </div>
            </NavLink>
          </div>
        </div>
        <div className={cn(styles.sidebar__user, styles.user)}>
          <NavLink to="#" className={styles.user__image} onClick={handleNavLinkClick}>
            <img src="/src/assets/user.jpeg" alt="user" />
          </NavLink>
          <div className={styles.user__info}>
            <div className={styles.user__name}>Evano</div>
            <div className={styles.user__position}>Project Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
};
