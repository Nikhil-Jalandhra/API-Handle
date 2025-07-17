import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import { Link } from 'react-router-dom';
import SkeletonCard from '../../components/SkeletonCard';
import usePaginationStore from '../../stateStore/paginationStore';
import Pagination from '../../components/Pagination';

export default function AllUsers() {

  const { pageNo } = useParams();

  const perPageGroup = 9;
  const { endPage, currentPage, setPage, setPageUser } = usePaginationStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(pageNo);
  

  // for Api
  // const totalPages = data.totalPages;
  // const Url = import.meta.env.VITE_API+"/public/randomusers?page=";

  // for Local
  const Url = "/randomUser.json";

  const dataFetcher = async (url, currentPage) => {
    try {
      setLoading(true);
      // for Api
      // const response = await fetch(`${url}${page}&limit=9`);

      // for local
      const response = await fetch(url);

      const json = await response.json();
      if (json) {
        setData(json);
        endPage(Math.ceil(json.length/perPageGroup));
        setPage(pageNo);
        setPageUser("user");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dataFetcher(Url, currentPage);
    };
    fetchData();
  }, [currentPage, pageNo]);
  

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

        <Pagination/>

        {loading ? (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* for Api */}
            {/* {data?.data?.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))} */}

            {/* for local */}
            {data.slice((currentPage - 1) * perPageGroup, currentPage * perPageGroup).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        <Pagination/>

      </main>
    </div>
    
  );
}
