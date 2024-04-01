import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "api/services/productService";
import { getProductPreviewImgUrl } from "utils/urlUtils";
import { IProduct } from "types";
import styles from "./product.module.scss";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fetched, setFetched] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data: product } = await getProductById(id!);

      if (product) {
        setProduct(product);
      }
      setFetched(true);
    }
    fetchProduct();
  }, [])

  useEffect(() => {
    if (fetched && !product) {
      navigate('/');
    }
  }, [fetched])

  if (!product) {
    return null;
  }

  const onAddToBasket = () => {

  }

  return (
    <div className={styles.productContainer}>
      <div>
        <img src={getProductPreviewImgUrl(product)} alt={product.name} />
      </div>
      <div className={styles.productContentContainer}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productPrice}>£{product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <button onClick={onAddToBasket}>Add to basket</button>
      </div>
    </div>
  );
};

export default ProductPage;