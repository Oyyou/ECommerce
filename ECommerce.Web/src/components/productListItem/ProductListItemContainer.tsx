import { ReactNode } from "react";
import styles from "./productListItem.module.scss";

export const ProductListItemContainer = ({ children }: { children: ReactNode }) => (
  <div className={styles.productListItemContainer}>
    {children}
  </div>
);