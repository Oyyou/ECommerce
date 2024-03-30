import { useEffect, useState } from "react";
import { getProducts } from "api/services/productService";
import { IProduct } from "types";
import { ProductList } from "components";
import styles from "./home.module.scss";

const HomePage = () => {
  const [products, setProducts] = useState<(IProduct | null)[]>(Array.from({ length: 20 }, () => null));

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products } = await getProducts();

      if (products) {
        setProducts(products);
      }
    }

    fetchProducts();
  }, [])

  return (
    <div className={styles.homeContainer}>
      <h2>Products</h2>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;