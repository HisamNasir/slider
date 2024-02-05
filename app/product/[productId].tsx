import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const images = product.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div>
      <h1>{product.title}</h1>
      <ImageGallery items={images} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const productId = context.params.productId;
  const response = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  const product = response.data;

  return {
    props: {
      product,
    },
  };
}
