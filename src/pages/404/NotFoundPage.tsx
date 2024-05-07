import img404 from '@assets/404.png';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button.tsx';
import { HOME_ROUTE } from '../../utils/constants.ts';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.layout404}>
      <img className={styles.pic404} src={img404} alt="not found" />
      <h2>404 - PAGE NOT FOUND</h2>
      <p>
        The page you are looking for might have been removed, <br /> had its name changed, or is temporarily
        unavailable.
      </p>
      <Link to={`${HOME_ROUTE}`}>
        <Button
          label="GO TO HOME PAGE"
          className="button-dark"
          type="button"
          disable={false}
          onClick={() => console.log('home page')}
        />
      </Link>
    </div>
  );
}

export default NotFoundPage;
