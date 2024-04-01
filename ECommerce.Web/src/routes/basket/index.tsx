import { CartItem } from "components";
import { useBasket } from "providers/cartProvider";
import styles from "./basket.module.scss";

const BasketPage = () => {
  const { cart } = useBasket();

  return (
    <div className={styles.basketContainer}>
      <h2>Items</h2>
      <div className={styles.cartItemsContainer}>
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button>Checkout</button>
    </div>
  );
};

export default BasketPage;