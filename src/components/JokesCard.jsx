import  { useMemo } from "react";

const emojis = ["😂", "🤣", "😜", "🙃", "😹", "🥲", "😆", "🤪", "🤭", "😛"];

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}



export default function JokeCard({ item}) {
  
  const emoji = useMemo(() => getRandomEmoji(), []);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:shadow-lg transition duration-200">
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="text-lg text-gray-200 leading-relaxed">“{item?.content}”</p>
      <div className="mt-3 text-sm text-gray-500 italic">
        {/* for Api */}
        {/* Category: {item.category} */}

        {/* for local */}
        Category: &nbsp;
        <div className="flex">
          { item?.categories.map((joke, index) => ( 
            <p key={index}>{joke}{ index+1 === item?.categories.length ? "." : ","}&nbsp;</p>
          ))}
        </div>

      </div>
    </div>
  );
}
