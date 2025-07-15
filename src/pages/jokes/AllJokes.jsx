// pages/AllJokes.jsx
import { useEffect, useState } from "react";
import JokeCard from "../../components/JokesCard";
import SkeletonJokeCard from "../../components/JokesSkeleton";
import { Link } from "react-router-dom";

function AllJokes() {

  // for API
  // const url = import.meta.env.VITE_API + "/public/randomjokes";

  // for local
  const url = "/randomjoke.json";

  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const search = (e) => {
    setQuery(e.target.value);
  };

  const fetchJokes = async () => {
    setLoading(true);
    try {

      // for Api
      // let params = new URLSearchParams();
      // params.append("limit", 10);
      // if (query.length > 2) {
      //   params.append("query", query);
      // }
      // params.append("inc", "category,id,content");

      // const data = await fetch(`${url}?${params}`);
      // const json = await data.json();
      // if (json) {
      //   setJokes(json.data.data);
      // } else {
      //   setJokes([]);
      // }

      // for Local
      const response = await fetch(url);
      const data = await response.json();
      var queryData = data;
      if (query.length > 2) {
        queryData = data?.filter((data) => (
          data.content?.toLowerCase().includes(query.toLowerCase()) ||
          data.categories?.some(category =>
              category.toLowerCase().includes(query.toLowerCase())
          )
        ));
      }
      if (queryData) {
        setJokes(queryData);
      } else {
        setJokes([]);
      }

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

   useEffect(() => {
      if(query.length > 2 || query.length === 0){
        const delayDebounce = setTimeout(() => {
          fetchJokes();
        }, 500);
        return () => clearTimeout(delayDebounce);
      }
    }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header & Search */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">😂 Joke Station</h1>
          <p className="text-gray-400 mb-4">Laugh out loud! Search or scroll through 100 random jokes.</p>
          <input
            type="text"
            value={query}
            onChange={search}
            placeholder="Search Jokes"
            className="w-full sm:w-96 px-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
          />
          <div className='w-full my-5 flex justify-center'>
              <Link to='/jokes/random'>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200 w-full sm:w-auto">
                  Get Random joke
                  </button>
              </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonJokeCard key={index} />
            ))}
          </div>
        ) : jokes.length === 0 ? (
          <div className="text-center text-red-400">No jokes found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jokes?.map((item) => (
              <JokeCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllJokes;
