"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

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
  key: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios
      .get(`https://dummyjson.com/products?page=${pageNumber}`)
      .then((response) => {
        const newProducts = response.data.products;

        if (Array.isArray(newProducts)) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...newProducts.map((product) => ({
              ...product,
              key: `${product.id}-${Date.now()}`,
            })),
          ]);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        } else {
          console.error("Invalid data format received from the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      loadProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products]);

  return (
    <div className="grid container px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.key}
          className="bg-white p-4 rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative w-full h-32 mb-4">
            <div className="flex w-full h-full overflow-hidden">
              {product.images.map((image, index) => (
                <Image
                  width={400}
                  height={400}
                  priority={true}
                  key={index}
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-800 font-bold mb-2">{product.title}</p>
          <p className="text-gray-600 mb-2">${product.price}</p>
          <div className="flex items-center text-gray-500">
            <span className="mr-2">{product.rating} Rating</span>
            <span>{product.stock} In Stock</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
