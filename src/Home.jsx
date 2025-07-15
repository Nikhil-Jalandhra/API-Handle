import { Link } from "react-router-dom";

const apiCategories = [
  { name: "Users 👤🫂", path: "/user", from: "from-green-400", to: "to-green-500" },
  { name: "Jokes 🤣😄", path: "/jokes", from: "from-green-500", to: "to-yellow-400" },
  { name: "Products 🛒🕶️", path: "/products", from: "from-yellow-400", to: "to-orange-500" },
  { name: "Books 📚📖", path: "/books", from: "from-orange-500", to: "to-red-500" },
  { name: "Stocks 🐂📈", path: "/stocks", from: "from-red-500", to: "to-red-600" },
  { name: "Videos 🎥📺", path: "/videos", from: "from-red-600", to: "to-red-800" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Welcome to My API Explorer
        </h1>

        {/* Credit / Footer */}
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <div className="flex justify-between items-center gap-3 bg-gray-900 px-6 py-4 border-b border-gray-700 text-sm sm:text-base">
            <p className="font-semibold text-green-400">By - Nikhil Jalandhra</p>
            <div className="flex gap-4 text-blue-400">
              <a className="underline" href="https://github.com/Nikhil-Jalandhra" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="underline" href="https://www.linkedin.com/in/nikhil-jalandhra-1479742b0/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="p-6 space-y-4 text-sm md:text-base text-gray-300">
            <div className="space-y-2">
              <h2 className="font-bold text-white">Note:</h2>
              <p>This project is completely based on REST APIs using only GET requests and parameters. It’s backend-ready but uses local JSON for frontend hosting.</p>

              <h2 className="font-bold text-white">Experience:</h2>
              <p>This was a fun and challenging experience, especially working with paginated APIs, dynamic queries, and category switching. It got more exciting as I moved beyond simple ones.</p>
            </div>
          </div>
        </div>

        <details className="bg-gray-800 text-white rounded-md p-4 mt-6">
          <summary className="cursor-pointer text-lg font-semibold">🔽 Credits & Thanks (click to expand)</summary>
          <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Thanks to <a href="https://github.com/hiteshchoudhary" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Hitesh Choudhary</a> Sir</li>
              <li>API for testing: <a href="https://github.com/hiteshchoudhary/apihub" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">apihub</a></li>
              <li>How to use apihub: <a href="https://youtu.be/KqGze7HCTIA?feature=shared" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Watch on YouTube</a></li>
              <li>By - Nikhil Jalandhra</li>
          </ul>
        </details>


        {/* Button Section */}
        <div>
          <h2 className="text-lg text-center mb-6 font-semibold text-indigo-300">I colored buttons based on project fun/difficulty level 🎨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apiCategories.map((category) => (
              <Link key={category.name} to={category.path}>
                <div className={`bg-gradient-to-b sm:bg-gradient-to-r ${category.from} ${category.to} hover:scale-105 transition-transform duration-300 p-6 rounded-xl shadow-md cursor-pointer h-full flex items-center justify-center text-lg md:text-xl font-semibold text-center`}>
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
