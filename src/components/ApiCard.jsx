import { Link } from 'react-router-dom';

export default function ApiCard({ title, image, link }) {
  return (
    <Link to={link}>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-white capitalize">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
