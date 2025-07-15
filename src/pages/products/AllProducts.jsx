import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import SkeletonCard from '../../components/SkeletonCard';
import { Link } from 'react-router-dom';

export default function AllProducts() {

  const [prdctData, setPrdctData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // for Api
  // const baseURL = import.meta.env.VITE_API + "/public/randomproducts";

  // for local
  const baseURL = "/randomProduct.json";

  const search = (e) => {
    setQuery(e.target.value);
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // For Api
      // Build dynamic URL
      // let params = new URLSearchParams();
      // params.append("page", page);
      // params.append("limit", 10);
      // params.append("inc","category,price,thumbnail,images,title,id,description,rating,stock");
      // if (query.length > 2) {
        //   params.append("query", query);
        // }
      // const response = await fetch(`${baseURL}?${params.toString()}`);
      // const data = await response.json();
      //  if (data?.data?.data) {
      //   setPrdctData(data.data.data);
      // } else {
      //   setPrdctData([]);
      // }

      
      // for Local
      const response = await fetch(baseURL);
      const data = await response.json();
      var queryData = data;
      if (query.length > 2) {
        queryData = data.filter((data) => (
          data.category.toLowerCase().includes(query.toLowerCase()) || 
          data.description.toLowerCase().includes(query.toLowerCase()) ||
          data.brand.toLowerCase().includes(query.toLowerCase()) ||
          data.title.toLowerCase().includes(query.toLowerCase())
        ));
      }else {
        queryData = data;
      }

      if (data) {
        setPrdctData(queryData);
      } else {
        setPrdctData([]);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
  if (query.length > 2 || query.length === 0) {
    const delayDebounce = setTimeout(() => {
      fetchProduct();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }
}, [query, page]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-6 px-4 sm:py-10">

      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Explore All Products</h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <input
                className="text-black px-3 py-2 rounded w-full sm:w-64"
                onChange={search}
                value={query}
                type="text"
                placeholder="At least 3 char"
              />

              <Link to="/products/random">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200 w-full sm:w-auto">
                  Get Random Product
                </button>
              </Link>
            </div>
          </div>
        </div>

         {query.length > 2 && !loading && (
            <p className="text-sm text-gray-400 mb-4">Results for "<strong>{query}</strong>"</p>
        )}

        {query.length > 0 && query.length <= 2 && (
          <p className="text-sm text-yellow-500 mb-4">
              Please enter at least 3 characters to search.
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          // for API
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          //   {prdctData.map((product) => (
          //     <ProductCard key={product.id} product={product} />
          //   ))}
          // </div>
          // for Local
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {prdctData.map((product, index) => index < 9 && (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && prdctData.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>

  );
}
