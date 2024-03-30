import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { login } from "api/services/authService";
import { tokenState } from "state/recoilState";
import styles from "./admin.module.scss";

const AdminPage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: token, error } = await login(email, password);
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    }

    if (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [token])

  return (
    <div className={styles.adminPageContainer}>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" content={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" content={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" content="Login" />
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AdminPage;