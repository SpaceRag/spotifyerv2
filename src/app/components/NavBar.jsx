import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>
            Accueil
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/playlists" className={styles.navbarLink}>
            Playlists
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/albums" className={styles.navbarLink}>
            Albums
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/artists" className={styles.navbarLink}>
            Artistes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
