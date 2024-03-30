import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Layout } from "components";

const Root = () => {
  return (
    <RecoilRoot>
      <Layout>
        <Outlet />
      </Layout>
    </RecoilRoot>
  );
};

export default Root;