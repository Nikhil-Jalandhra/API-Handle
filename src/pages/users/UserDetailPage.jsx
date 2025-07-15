import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import SkeletonUserDetail from "../../components/SkeletonUserDetail";

export default function UserDetailPage() {
  const { id } = useParams();
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // for Api
    // const url = import.meta.env.VITE_API+"/public/randomusers/";

    // for Local
    const url = "/randomUser.json";

    const fetchDetail = async () => {
      try {
        // for API
        // const response = await fetch(url + id);
        // const result = await response.json();
        // if (result?.data) {
        //   setUserData(result.data);
        // }


        // for local
        const response = await fetch(url);
        const result = await response.json();
        const selectData = result.find((data) => ( data.id) === parseInt(id))        
        if (selectData) {
          setUserData(selectData);
        }


      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 text-white">
      <SkeletonUserDetail />
    </div>
  );
}

  if (!userData) {
    return <div className="text-red-500 text-center mt-10">User not found.</div>;
  }

  return (
  <div className="min-h-screen w-full bg-gradient-to-br p-10 from-gray-900 via-gray-800 to-black text-white">
    <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={userData.picture.large}
          alt={`${userData.name.first} ${userData.name.last}`}
          className="w-40 h-40 rounded-full border-4 border-gray-700 object-cover"
        />

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            {userData.name.title} {userData.name.first} {userData.name.last}
          </h2>
          <p className="text-gray-400"><strong>Email:</strong> {userData.email}</p>
          <p className="text-gray-400"><strong>Gender:</strong> {userData.gender}</p>
          <p className="text-gray-400"><strong>Phone:</strong> {userData.phone} | <strong>Cell:</strong> {userData.cell}</p>
          <p className="text-gray-400">
            <strong>Date of Birth:</strong> {new Date(userData.dob.date).toLocaleDateString()} ({userData.dob.age} yrs)
          </p>
          <p className="text-gray-400">
            <strong>Registered:</strong> {new Date(userData.registered.date).toLocaleDateString()} ({userData.registered.age} yrs ago)
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-gray-300">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p>{userData.location.street.number} {userData.location.street.name}, {userData.location.city}, {userData.location.state}, {userData.location.country}, {userData.location.postcode}</p>
        <p><strong>Timezone:</strong> {userData.location.timezone.description} ({userData.location.timezone.offset})</p>
        <p><strong>Coordinates:</strong> {userData.location.coordinates.latitude}, {userData.location.coordinates.longitude}</p>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-gray-300">
        <h3 className="text-xl font-semibold mb-2">Login Info</h3>
        <p><strong>Username:</strong> {userData.login.username}</p>
        <p><strong>UUID:</strong> {userData.login.uuid}</p>
        <p><strong>Password (SHA-256):</strong> {userData.login.sha256}</p>
      </div>
    </div>
  </div>
  );
}
