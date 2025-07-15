import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // for api
  // const url = import.meta.env.VITE_API + `/public/books/book/random`;
  
  // for local
  const url = '/books.json';


  const fetchBook = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      // for Api
      // setBook(json?.data || null);

      // for local
      const id = Math.floor(Math.random()*99)+1;
      const selectData = json.find((data) => ( data.id) === parseInt(id))   
      setBook(selectData || null);



    } catch (error) {
      console.error('Book fetch error:', error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-lg">
        Loading book details...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-xl">📕 Book not found.</p>
        <Link to="/books" className="text-indigo-400 mt-4 hover:underline">
          ← Back to All Books
        </Link>
      </div>
    );
  }

  const info = book.volumeInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">

        <div className='w-full mb-5 flex justify-center'>
            <button onClick={fetchBook} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-200 w-full sm:w-auto">
            Get Random Books
            </button>
        </div>

      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 items-start">

        <div className="w-full">
          <img
            src={info.imageLinks?.thumbnail || '/placeholder.jpg'}
            alt={info.title}
            className="rounded-lg w-full h-auto max-h-[600px] object-cover shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{info.title}</h1>

          {info.subtitle && (
            <h2 className="text-lg sm:text-xl text-gray-400 italic">{info.subtitle}</h2>
          )}

          <p className="text-sm text-gray-400">
            By <span className="font-medium text-white">{info.authors?.join(', ') || 'Unknown Author'}</span>
            {info.publisher && ` · ${info.publisher}`}
            {info.publishedDate && ` (${info.publishedDate})`}
          </p>

          {info.description && (
            <p className="text-gray-300 text-sm leading-relaxed">{info.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-4">
            {info.pageCount > 0 && (
              <span><strong>Pages:</strong> {info.pageCount}</span>
            )}
            {info.categories?.length > 0 && (
              <span><strong>Category:</strong> {info.categories.join(', ')}</span>
            )}
            {info.language && (
              <span><strong>Language:</strong> {info.language.toUpperCase()}</span>
            )}
          </div>

          {book.saleInfo?.buyLink && (
            <a
              href={book.saleInfo.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
            >
              Buy Now – {book.saleInfo?.retailPrice?.amount} {book.saleInfo?.retailPrice?.currencyCode}
            </a>
          )}

          <Link to="/books" className="block mt-6 text-indigo-400 hover:underline">
            ← Back to All Books
          </Link>
        </div>
      </div>
    </div>
  );
}
