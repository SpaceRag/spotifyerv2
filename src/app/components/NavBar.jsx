import React from 'react';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <a href="/" className={styles.navbarLink}>
            Accueil
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/playlists" className={styles.navbarLink}>
            Playlists
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/albums" className={styles.navbarLink}>
            Albums
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/artists" className={styles.navbarLink}>
            Artistes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
