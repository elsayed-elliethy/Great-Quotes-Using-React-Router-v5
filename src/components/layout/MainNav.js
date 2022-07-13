// import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";
const MainNav = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Great Quotes</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/all-quotes">
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/new-quote">
              New Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNav;
