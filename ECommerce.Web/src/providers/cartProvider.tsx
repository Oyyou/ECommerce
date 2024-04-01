import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ICart, IProduct } from "types";
import { v4 } from "uuid";

interface ICartContextInput {
  cart: ICart,
  addToCart: (item: IProduct) => void,
}

const getCartData = (): ICart => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : { items: [] };
}

const CartContext = createContext<ICartContextInput>({} as ICartContextInput);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [uniqueId] = useState<string>(() => localStorage.getItem("uniqueId") || v4());
  const [cart, setCart] = useState<ICart>(getCartData);

  useEffect(() => {
    localStorage.setItem("uniqueId", uniqueId);
  }, [uniqueId]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: IProduct) => {
    const cart = getCartData();
    const item = cart.items.find(({ id }) => id === newItem.id) ?? {
      id: newItem.id,
      qty: 0,
    };

    const items = cart.items.filter(({ id }) => id !== newItem.id);

    setCart({
      ...cart,
      items: [
        ...items, {
          ...item,
          qty: item.qty + 1,
        }
      ]
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
      }}>
      {children}
    </CartContext.Provider>
  )
}

const useBasket = () => {
  const {
    cart,
    addToCart,
  } = useContext(CartContext);

  return {
    cart,
    addToCart,
  };
}

export {
  useBasket,
  CartContext,
  CartProvider,
};