import { FC } from "react"
import { IProduct } from "types";
import { getProductPreviewImgUrl } from "utils/urlUtils";
import { ProductListItemContainer } from "./ProductListItemContainer";
import styles from "./productListItem.module.scss";

type ProductListItemProps = {
  product: (IProduct | null);
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {

  return (
    <ProductListItemContainer>
      {product &&
        <a href={`/product/${product.id}`}>
          <div className={styles.textContainer}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
          <img src={getProductPreviewImgUrl(product)} alt={product.name} />
        </a>
      }
    </ProductListItemContainer>
  );
};

export default ProductListItem;