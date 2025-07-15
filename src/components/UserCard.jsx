import { Link } from "react-router-dom";


export default function UserCard({ user }) {
  return (
  <Link to={`/user/${user?.id}`}>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-24 h-24 rounded-full border-4 border-gray-700 mb-4"
          />
        <h3 className="text-xl font-semibold">
          {user.name.title} {user.name.first} {user.name.last}
        </h3>
        <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        <p className="text-sm text-gray-400">
          {user.location.city}, {user.location.country}
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-300">
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
        <p><span className="font-medium">DOB:</span> {new Date(user.dob.date).toLocaleDateString()}</p>
        <p><span className="font-medium">Nationality:</span> {user.nat}</p>
      </div>
    </div>
  </Link>
  );
}
