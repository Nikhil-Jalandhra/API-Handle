import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard';
import { Link } from 'react-router-dom';
import SkeletonCard from '../../components/SkeletonCard';

export default function AllUsers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // for Api
  // const totalPages = data.totalPages;
  // const Url = import.meta.env.VITE_API+"/public/randomusers?page=";

  // for Local
  const usersPerPage = 9;
  const totalPages = Math.ceil(data.length / usersPerPage);
  const Url = "/randomUser.json";

  const dataFetcher = async (url, page) => {
    try {
      setLoading(true);
      // for Api
      // const response = await fetch(`${url}${page}&limit=9`);

      // for local
      const response = await fetch(url);

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataFetcher(Url, page);
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, [page]);
  
  const pagesPerGroup = 10;
  const currentGroup = Math.floor((page - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="flex-grow py-10">
        <div className='flex justify-between items-center max-w-7xl mx-auto px-4 mb-6'>
          <h2 className="text-3xl font-bold">Welcome to My API Testing</h2>
          <Link to="/user/random">
            <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200'>
              Get Random User
            </button>
          </Link>
        </div>

        {/* 🔘 Pagination buttons */}
        <div className='flex justify-center items-center my-6 flex-wrap gap-2'>
          <button className='px-3 py-2 rounded hover:bg-gray-600'
          onClick={() => setPage(1)} disabled={page === 1}>⏮ First</button>

          <button
            className='bg-gray-700 px-3 py-2 rounded hover:bg-gray-600'
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Prev
          </button>

          {pageNumbers.map((p) => (
            <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded ${
              page === p
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  >
              {p}
            </button>
          ))}

          <button
            className='bg-gray-700 px-3 py-2 rounded hover:bg-gray-600'
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>

          <button className='px-3 py-2 rounded hover:bg-gray-600' onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last ⏭</button>

        </div>

        {loading ? (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* for Api */}
            {/* {data?.data?.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))} */}

            {/* for local */}
            {data.slice((page - 1) * usersPerPage, page * usersPerPage).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

         {/* 🔘 Pagination buttons */}
        <div className='flex justify-center items-center my-6 flex-wrap gap-2'>
          <button
            className='bg-gray-700 px-3 py-2 rounded hover:bg-gray-600'
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Prev
          </button>

          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-2 rounded ${
                page === p
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            className='bg-gray-700 px-3 py-2 rounded hover:bg-gray-600'
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>

      </main>
    </div>
    
  );
}
