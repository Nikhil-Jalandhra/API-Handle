import React, { useEffect, useState } from 'react';
import ProductDetailSkeleton from '../../components/ProductDetailsSkeleton';

export default function GetRandomProduct() {
  const [prdctData, setPrdctData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // for APi
  // const url = import.meta.env.VITE_API + `/public/randomproducts/product/random`;

  // for local
  const url = "/randomProduct.json";

  const dataFetch = async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      
      // for API
      // if (json?.data) {
      //   setPrdctData(json.data);
      //   setMainImage(json.data.thumbnail || json.data.images?.[0]);
      // }
      
      // for local
      const id = Math.floor(Math.random()*99)+1;
      const selectData = json.find((data) => ( data.id) === parseInt(id))        
      if (selectData) {
        setPrdctData(selectData);
        setMainImage(selectData.thumbnail || selectData.images?.[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if(loading){
    return <ProductDetailSkeleton/>
  }

  if (!prdctData) {
    return <div className="text-red-500 text-center">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 sm:p-10">

    <div className='w-full mb-5'>
        <button onClick={dataFetch} className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200'>
            Get Random Products
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={mainImage}
            alt={prdctData.title}
            className="w-full max-h-[400px] object-contain rounded-lg border border-gray-700 mb-4"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {prdctData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded border-2 ${
                  mainImage === img ? "border-blue-500" : "border-gray-600"
                } cursor-pointer`}
                alt={`Product ${index}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{prdctData.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{prdctData.brand} — {prdctData.category}</p>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-green-400">${prdctData.price}</span>
            <span className="ml-4 text-yellow-400 bg-yellow-900 px-2 py-1 rounded text-sm">
              ⭐ {prdctData.rating}
            </span>
            <span className="ml-4 text-sm text-gray-400">
              Stock: {prdctData.stock}
            </span>
          </div>

          <p className="text-gray-300 mb-6">{prdctData.description}</p>

          {prdctData.discountPercentage && (
            <p className="text-pink-400 mb-4 font-semibold">
              Discount: {prdctData.discountPercentage}%
            </p>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
