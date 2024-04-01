
import { useRecoilState } from 'recoil';
import { tokenState } from 'state/recoilState';
import styles from './header.module.scss';

const Header = () => {
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("");
  }

  return (
    <div className={styles.headerOuterContainer}>
      <div className={styles.headerContainer}>
        <nav>
          <a href='/'><h1>Shop</h1></a>
          {token && (
            <div className={styles.navContainer}>
              <ul>
                <li><a href='/admin/dashboard'>Dashboard</a></li>
              </ul>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          <div className={styles.navContainer}>
            <ul>
              <li>
                <a href='/basket'>Basket</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;