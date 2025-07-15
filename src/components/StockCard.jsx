import { Link } from "react-router-dom"

export default function StockCard({ stock }) {

  return (
    <Link to={`/stocks/${stock.Symbol}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 border border-gray-700">
        <h3 className="text-xl font-semibold mb-1">{stock.Name}</h3>
        <p className="text-sm text-gray-400 mb-2">{stock.Symbol}</p>

        <div className="text-sm space-y-1">
          <p><span className="text-gray-400">Market Cap:</span> {stock.MarketCap}</p>
          <p><span className="text-gray-400">Price:</span> {stock.CurrentPrice}</p>
          <p><span className="text-gray-400">PE Ratio:</span> {stock.StockPE}</p>
          <p><span className="text-gray-400">ROE:</span> {stock.ROE}</p>
          <p><span className="text-gray-400">Dividend Yield:</span> {stock.DividendYield}</p>
        </div>
      </div>
    </Link>
  );
}
