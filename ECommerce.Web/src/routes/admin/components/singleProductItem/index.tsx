import { IProduct } from "types"
import styles from "./singleProductItem.module.scss";

const SingleProductItem = ({ product }: { product: IProduct }) => {

  return (
    <div className={styles.singleProductItemContainer}>
      {product.name}
    </div>
  );
};

export default SingleProductItem;