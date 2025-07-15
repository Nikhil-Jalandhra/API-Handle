import { useEffect, useState } from 'react';
import SkeletonJokeCard from "../../components/JokesSkeleton";

function GetRandomJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const emojis = ["🤣", "😂", "😅", "😆", "😁", "😹", "😸"];
  const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
  const [emoji, setEmoji] = useState(getRandomEmoji());
  const [emoji1, setEmoji1] = useState(getRandomEmoji());

  // for Api
  // const url = import.meta.env.VITE_API + `/public/randomjokes/joke/random`;

   // for local
  const url = "/randomjoke.json";

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      
      // for Api 
      // setJoke(json?.data || null);

      // for local
      const id = Math.floor(Math.random()*99)+1;
      const selectData = json.find((data) => ( data.id) === parseInt(id))   
      setJoke(selectData || null);


      setEmoji(getRandomEmoji());
      setEmoji1(getRandomEmoji());
      
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">😂 Joke Station</h1>
          <p className="text-gray-400 mb-4">Enjoy a random joke to brighten your day.</p>
          <button
            onClick={fetchJoke}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition duration-200"
          >
            Get Another Joke
          </button>
        </div>

        {/* Joke Display */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            <SkeletonJokeCard />
          </div>
        ) : joke ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl mb-4">{emoji}</div>
            <p className="text-lg sm:text-xl text-gray-100">{joke.content}</p>
            <div className="text-3xl mt-4">{emoji1}</div>
          </div>
        ) : (
          <div className="text-red-500 text-center">No joke available. Try again!</div>
        )}
      </div>
    </div>
  );
}

export default GetRandomJoke;
