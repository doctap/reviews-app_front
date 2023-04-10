import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Outlet, Link } from 'react-router-dom';
import { UserAuth } from '../../components';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <Nav className={styles.nav} variant="tabs">
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profilePage">My Profile</Link>
        </Nav.Item>
        <Nav.Item className='d-flex align-items-center'>
          <UserAuth/>
        </Nav.Item>
      </Nav>
      <Outlet />
    </>
  );
};
