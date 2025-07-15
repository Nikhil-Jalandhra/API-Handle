import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../../components/BooksCard';
import SkeletonCard from '../../components/BookSkeleton';

export default function AllBooks() {

  // for Api
  // const url = import.meta.env.VITE_API + '/public/books';
  
  // for local
  const url = '/books.json';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const search = (e) => {
    setQuery(e.target.value);
  };

  const fetchBooks = async (url) => {
    setLoading(true);
    try {

      // for Api 
      // let params = new URLSearchParams({ limit: 10, inc: 'kind,id,etag,volumeInfo' });
      // if (query.length > 2) params.append('query', query);
      // const response = await fetch(`${url}?${params.toString()}`);
      // const json = await response.json();
      // setBooks(json?.data?.data || []);

      // for local

      const response = await fetch(url);
      const json = await response.json();

      var data = json;
      if (query.length > 2) {
        data = json.filter((items) => (
          items.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
        ));
      }
      if (data) {
        setBooks(data);
      }

    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(url);
  }, []);


  useEffect(() => {
    if(query.length > 2 || query.length === 0){
      const delayDebounce = setTimeout(() => {
        fetchBooks(url);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [query]);





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-6 px-4 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Explore All Books</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              value={query}
              onChange={search}
              placeholder="At least 3 char"
              className="text-black px-3 py-2 rounded w-full sm:w-64"
            />
            <Link to="/books/random">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200 w-full sm:w-auto">
                Get Random Books
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
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {books.map((book, index) => index < 9 && (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-10">No books found.</p>
        )}
      </div>
    </div>
  );
}
