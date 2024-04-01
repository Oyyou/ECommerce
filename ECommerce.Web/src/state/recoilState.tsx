import { atom, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { IBasket } from "types";

export const tokenState = atom<string>({
  key: "tokenState",
  default: localStorage.getItem('token') || "",
});

const basketDefaultSelector = selector<IBasket>({
  key: "basketDefaultSelector",
  get: ({ get }) => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      return JSON.parse(storedBasket);
    } else {
      const basket = {
        ownerId: uuidv4(),
        items: []
      };
      localStorage.setItem('basket', JSON.stringify(basket));
      return basket;
    }
  },
});

export const basketState = atom<IBasket>({
  key: "basketState",
  default: basketDefaultSelector,
});