import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Layout } from "components";
import { CartProvider } from "providers/cartProvider";

const Root = () => {
  return (
    <CartProvider>
      <RecoilRoot>
        <Layout>
          <Outlet />
        </Layout>
      </RecoilRoot>
    </CartProvider>
  );
};

export default Root;