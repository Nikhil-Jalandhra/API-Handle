import { useEffect, useState } from 'react';
import StockCard from '../../components/StockCard';
import StockSkeleton from '../../components/StockSkeleton';
import Pagination from '../../components/Pagination';
import usePaginationStore from '../../stateStore/paginationStore';
import { useParams } from 'react-router-dom';

function AllStocks() {

  const { pageNo } = useParams();

  // for Api
  // const url = import.meta.env.VITE_API + "/public/stocks";

  // for local
  const url = "/nse-stocks.json";

  const perPageGroup = 12;
  const { endPage, currentPage, setPageUser, setPage } = usePaginationStore();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const search = (e) => {
    setQuery(e.target.value);
  };

  const fetchStocks = async (url) => {
    setLoading(true);
    try {

      // for Api
      // let params = new URLSearchParams({ limit: 10 });
      // if (query.length > 2) {
      //   params.append("query", query);
      // }
      // const data = await fetch(`${url}?${params}`);
      // const json = await data.json();
      // if (json && json.data?.data) {
      //   setStocks(json.data.data);
      // } else {
      //   setStocks([]);
      // }

      // for local
      const response = await fetch(url);
      const json = await response.json();
      var data = json;
      if (query.length > 2) {
        data = json.filter((items) => (
          items?.Name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          items?.Symbol?.toLowerCase()?.includes(query?.toLowerCase())
        )); 
      }
      if (data) {
        setStocks(data);
        setPage(pageNo);
        setPageUser("stocks");
        endPage(Math.ceil(data.length/perPageGroup));
      } else {
        setStocks([]);
      }



    } catch (error) {
      console.error("Error fetching stocks:", error);
      setStocks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStocks(url);
  }, [pageNo, currentPage]);

  useEffect(() => {
  if (query.length > 2 || query.length === 0) {
    const delayDebounce = setTimeout(() => {
      fetchStocks(url);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }
}, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-6 px-4 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Explore Stocks</h2>
                <input
                type="text"
                value={query}
                onChange={search}
                placeholder="Search stocks"
                className="text-black px-4 py-2 rounded w-full sm:w-64"
                />
        </div>

        {query.length > 2 && !loading && (
            <p className="text-sm text-gray-400 mb-4">Results for "<strong>{query}</strong>"</p>
        )}

        {query.length > 0 && query.length <= 2 && (
          <p className="text-sm text-yellow-500 mb-4">
              Please enter at least 3 characters to search.
          </p>
        )}

        <Pagination/>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <StockSkeleton key={i} />
            ))}
          </div>
        ) : stocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stocks.slice((currentPage - 1) * perPageGroup, currentPage * perPageGroup).map((stock) => (
              <StockCard key={stock.Symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-10">No stocks found.</p>
        )}
        
        <Pagination/>

      </div>
    </div>
  );
}

export default AllStocks;
