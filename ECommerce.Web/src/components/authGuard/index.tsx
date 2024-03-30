import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "state/recoilState";
import { verify } from "api/services/authService";

export const AuthGuard = ({ children }: { children: ReactNode }) => {

  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runVerify = async () => {
      if (!loading) {
        return;
      }
      const verified = await verify(token);

      if (!verified) {
        setToken("");
        localStorage.setItem("token", "");
        console.error("Access required");
        navigate('/admin');
      }
      setLoading(false);
    }

    runVerify();

  }, [token])

  if (loading) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}

export default AuthGuard;