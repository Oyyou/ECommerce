import { FC, useEffect, useState } from "react"
import { getProductById } from "api/services/productService";
import { ICartItem, IProduct } from "types"
import styles from "./cartItem.module.scss";

type cartItemProps = {
  item: ICartItem,
}

const CartItem: FC<cartItemProps> = ({ item }) => {

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data: product } = await getProductById(item.id);

      if (product) {
        setProduct(product);
      }
    }
    fetchProduct();
  }, [])

  if (!product) {
    return null;
  }

  return (
    <div className={styles.cardItemContainer}>
      {product &&
        <>
          {product.price}
        </>
      }
    </div>
  )
}

export default CartItem;