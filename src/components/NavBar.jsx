import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 bg-opacity-95 text-white px-6 py-4 shadow-lg w-full">
      <div className="w-full mx-auto flex justify-between items-center sm:px-20">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white hover:text-blue-400 transition duration-300">
          API<span className="text-blue-500">Testing</span>
        </Link>

        <a
          href="https://github.com/Nikhil-Jalandhra"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 sm:mt-0 text-sm sm:text-base font-semibold text-blue-400 transition duration-300 underline">
          @Nikhil-Jalandhra
        </a>
      </div>
    </nav>
  );
}
