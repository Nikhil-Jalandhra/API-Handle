import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePaginationStore from '../stateStore/paginationStore';

function Pagination() {
  const { setPage, totalPage, currentPage, pageUser } = usePaginationStore();
  const { page } = useParams();

  useEffect(() => {
    const pageNumber = Number(page);
    if (!isNaN(pageNumber)) {
      const validPage = Math.max(1, Math.min(pageNumber, totalPage));
      setPage(validPage);
    }
  }, [page, totalPage, setPage]);

  const pageGroup = 10;
  const currentGroup = Math.floor((currentPage - 1) / pageGroup);
  const firstPage = currentGroup * pageGroup + 1;
  const lastPage = Math.min(firstPage + pageGroup - 1, totalPage);

  const pages = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center my-5 px-2 sm:px-0">
      <Link to={`/${pageUser}/page/1`}>
        <button
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base transition ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500'
          }`}
        >
          First
        </button>
      </Link>

      <Link to={`/${pageUser}/page/${Math.max(currentPage - 1, 1)}`}>
        <button
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base transition ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500'
          }`}
        >
          ← Prev
        </button>
      </Link>

      {pages.map((pageNum) => (
        <Link to={`/${pageUser}/page/${pageNum}`} key={`page-${pageNum}`}>
          <button
            className={`px-3 py-1.5 rounded-md text-sm sm:text-base transition ${
              currentPage === pageNum
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {pageNum}
          </button>
        </Link>
      ))}

      <Link to={`/${pageUser}/page/${Math.min(currentPage + 1, totalPage)}`}>
        <button
          disabled={currentPage === totalPage}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base transition ${
            currentPage === totalPage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500'
          }`}
        >
          Next →
        </button>
      </Link>

      <Link to={`/${pageUser}/page/${totalPage}`}>
        <button
          disabled={currentPage === totalPage}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base transition ${
            currentPage === totalPage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500'
          }`}
        >
          Last
        </button>
      </Link>
    </div>
  );
}

export default Pagination;
