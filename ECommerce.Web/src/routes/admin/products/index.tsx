import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductPreviewImgUrl } from "utils/urlUtils";
import { getProducts } from "api/services/productService";
import { IProduct } from "types";
import { AuthGuard } from "components";
import { CreateProductModal, EditProductModal } from "routes/admin/components";
import styles from "./products.module.scss";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const createProduct = searchParams.get('create');
  const editProduct = searchParams.get('edit');
  const editId = searchParams.get('editId');

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products } = await getProducts();

      if (products) {
        setProducts(products);
      }

      setLoading(false);
    }

    fetchProducts();
  }, [])

  const handleOnCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedProducts((prev) => ([
        ...prev,
        id,
      ]));
    } else {
      setSelectedProducts((prev) => prev.filter((p) => p !== id));
    }
  }

  const handleOnModalClosed = () => {
    navigate('/admin/products');
  }

  if (loading) {
    return null;
  }

  return (
    <AuthGuard>
      {!!createProduct && <CreateProductModal onClose={handleOnModalClosed} />}
      {(!!editProduct && editId) && <EditProductModal productId={editId} onClose={handleOnModalClosed} />}
      <div className={styles.productsContainer}>
        <h2>Products</h2>
        <div className={styles.actionsContainer}>
          <div className={styles.actionButtonsContainer}>
            <button disabled={!selectedProducts.length}>Delete</button>
            <button disabled={!selectedProducts.length}>Disable</button>
            <button disabled={!selectedProducts.length}>Publish</button>
            <button onClick={() => navigate('/admin/products?create=true')}>Add Product</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className={styles.checkboxCell}><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={(e) => handleOnCheckboxChanged(e, product.id)} /></td>
                <td className={styles.imageCell}>
                  <img src={getProductPreviewImgUrl(product)} alt={product.name} />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>todo: ACTIVE | DRAFT | DISABLED</td>
                <td><button onClick={() => navigate(`/admin/products?edit=true&editId=${product.id}`)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  );
};

export default ProductsPage;