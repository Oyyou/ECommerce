import { useNavigate } from "react-router-dom";
import styles from "./quickAccess.module.scss";

const QuickAccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <h3>Quick Access</h3>
      <div className={styles.quickAccessBodyContainer}>
        <button onClick={() => navigate('/admin/products?create=true')}>Add product</button>
        <button onClick={() => navigate('/admin/products')}>Edit Users</button>
        <button onClick={() => navigate('/admin/products')}>View products</button>
      </div>
    </>
  );
}

export default QuickAccess;