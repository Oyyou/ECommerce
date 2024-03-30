import { FC } from "react";
import { IProduct } from "types";
import { ProductListItem } from "components";
import styles from "./productList.module.scss";

type ProductListProps = {
  products: (IProduct | null)[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {

  return (
    <div className={styles.productListContainer}>
      {products.map((product, i) =>
        <ProductListItem key={`${product?.id}-${i}`} product={product} />
      )}
    </div>
  );
};

export default ProductList;