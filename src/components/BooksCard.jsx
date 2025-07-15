import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const info = book.volumeInfo;
  
  return (
    <Link to={`/books/${book.id}`} className="block">
      <div className="flex flex-col sm:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200">
        
        {/* Thumbnail */}
        <div className="sm:w-48 w-full flex-shrink-0">
          <img
            src={info.imageLinks?.thumbnail || '/placeholder.jpg'}
            alt={info.title}
            className="w-full h-64 sm:h-full object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <h3 className="text-lg font-bold text-white line-clamp-2 mb-1">{info.title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {info.authors?.join(', ') || 'Unknown Author'}
            </p>

            <p className="text-sm text-gray-300 line-clamp-3 mb-3">
              {info.description || 'No description available.'}
            </p>

            {/* Extra metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {info.publishedDate && (
                <span><strong>Published:</strong> {info.publishedDate}</span>
              )}
              {info.pageCount > 0 && (
                <span><strong>Pages:</strong> {info.pageCount}</span>
              )}
              {info.categories?.length > 0 && (
                <span><strong>Category:</strong> {info.categories[0]}</span>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-indigo-400 hover:underline self-start">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}
