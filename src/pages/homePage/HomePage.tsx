import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
        HomePage
      <Outlet />
    </div>
  );
};
