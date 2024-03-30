import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "api/services/productService";
import styles from "./createProductModal.module.scss";

type createProductModalProps = {
  onClose: () => void,
}

const CreateProductModal: FC<createProductModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if image is provided
    if (!image) {
      setError("Please select an image.");
      return;
    }

    // Check if image is a JPG file
    if (!image.type.startsWith("image/jpeg")) {
      setError("Please upload a JPG file.");
      return;
    }

    // Check image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
      if (img.width !== 200 || img.height !== 200) {
        setError("Image must have dimensions of 200x200 pixels.");
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("image", image);

        const { error } = await createProduct(formData);
        if (error) {
          setError(error);
        } else {
          navigate('/admin/products');
        }
      }
    };
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.createProductModalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>New Product</h3>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="price">Price:</label>
          <input id="price" type="number" step=".01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          <label htmlFor="image">Image:</label>
          <input id="image" type="file" name="image" accept="image/jpeg" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          <input type="submit" value="Create" />
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default CreateProductModal;