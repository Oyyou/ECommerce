import { getProductById } from "api/services/productService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "types";


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

  return (
    <div>
      {product?.name}
    </div>
  );
};

export default ProductPage;