import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IProduct } from "types";
import { getProductById } from "api/services/productService";
import styles from "./editProductModal.module.scss";

type editProductModalProps = {
  onClose: () => void,
  productId: string;
}

const EditProductModal: FC<editProductModalProps> = ({ onClose, productId }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct>()

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        return;
      }
      
      const { data: product, error } = await getProductById(productId);

      if (error) {
        console.error(error);
        navigate('/admin/products');
      } else if (product) {
        setProduct(product);
        setName(product.name);
        setPrice(product.price);
      }
    }

    fetchProduct();
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate('/admin/products');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.editProductModalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>Editing product</h3>
        {!product ?
          <p>Loading...</p> :
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="price">Price:</label>
            <input id="price" type="number" step=".01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
            <input type="submit" value="Update" />
          </form>
        }
      </div>
    </div>
  )
}

export default EditProductModal;