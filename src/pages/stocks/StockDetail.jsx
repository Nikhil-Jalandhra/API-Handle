import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StockDetailSkeleton from "../../components/StockDetailSkeleton";

function StockDetail() {

  const { stockSymbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  // for Api
  // const url = import.meta.env.VITE_API + `/public/stocks/${stockSymbol}`;

  // for local
  const url = '/nse-stocks.json';

  const fetchBook = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();


      
      // for Api
      setStockData(json?.data || null);

      // for local
      if (json) {
        const selectData = json.find((data) => (data.Symbol === stockSymbol))        
        setStockData(selectData);
      }

    } catch (error) {
      console.error('Book fetch error:', error);
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBook();
  }, []);
  

  if (loading) return <StockDetailSkeleton />;

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 sm:p-10">

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-2">{stockData.Name}</h1>
        <p className="text-gray-400 mb-4 text-sm">{stockData.Symbol} | ISIN: {stockData.ISIN}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div>
            <p><span className="text-gray-400">Listing Date:</span> {stockData.ListingDate}</p>
            <p><span className="text-gray-400">Current Price:</span> {stockData.CurrentPrice}</p>
            <p><span className="text-gray-400">High / Low:</span> {stockData.HighLow}</p>
            <p><span className="text-gray-400">Market Cap:</span> {stockData.MarketCap}</p>
          </div>

          <div>
            <p><span className="text-gray-400">Stock P/E:</span> {stockData.StockPE}</p>
            <p><span className="text-gray-400">Book Value:</span> {stockData.BookValue}</p>
            <p><span className="text-gray-400">ROCE:</span> {stockData.ROCE}</p>
            <p><span className="text-gray-400">ROE:</span> {stockData.ROE}</p>
            <p><span className="text-gray-400">Dividend Yield:</span> {stockData.DividendYield}</p>
            <p><span className="text-gray-400">Face Value:</span> {stockData.FaceValue}</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded transition">Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
}

export default StockDetail;
