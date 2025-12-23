import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { FaUserCircle, FaEnvelope, FaEdit, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user from database
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/users-coll?email=${user.email.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setDbUser(data[0]);
          setFormData({
            displayName: data[0].displayName || '',
            photoURL: data[0].photoURL || '',
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!dbUser?._id) return;

    fetch(`http://localhost:3000/users-coll/${dbUser._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        setDbUser(prev => ({ ...prev, ...formData }));
        setEditMode(false);
        alert('Profile updated successfully!');
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        {formData.photoURL ? (
          <img
            src={formData.photoURL}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#e9553f] shadow-md transition-transform transform hover:scale-105"
          />
        ) : (
          <FaUserCircle className="w-32 h-32 text-[#e9553f] shadow-md" />
        )}
        <p className="mt-4 text-gray-600 font-semibold text-lg">Role: {dbUser.role}</p>
      </div>

      {/* Info */}
      <div className="mt-8 space-y-4">
        {!editMode ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center">{dbUser.displayName}</h2>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <FaEnvelope /> {dbUser.email}
            </p>
          </>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#e9553f] transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#e9553f] transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        {!editMode ? (
          <button
            className="bg-[#e9553f] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#d84930] flex items-center gap-2 transition-transform transform hover:scale-105"
            onClick={() => setEditMode(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 flex items-center gap-2 transition-transform transform hover:scale-105"
              onClick={handleUpdate}
            >
              <FaSave /> Save Changes
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow-md hover:bg-gray-400 transition-transform transform hover:scale-105"
              onClick={() => {
                setEditMode(false);
                setFormData({
                  displayName: dbUser.displayName,
                  photoURL: dbUser.photoURL,
                });
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
