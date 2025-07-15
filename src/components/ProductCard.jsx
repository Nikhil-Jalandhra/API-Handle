import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
  <Link to={`/products/${product.id}`}>
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4 text-white">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-sm text-gray-400 mb-2">{product?.description?.slice(0, 60)}...</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-green-400 text-sm">
            {product.discountPercentage}% off
          </span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>⭐ {product.rating}</span>
          <span>Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  </Link>
  );
}
