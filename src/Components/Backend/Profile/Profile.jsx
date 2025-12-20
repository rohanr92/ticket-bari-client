import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
    const { user } = useContext(AuthContext);

    
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg">Loading user information...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-base-100 p-8 rounded-xl shadow">
            <div className="flex flex-col items-center text-center">
               
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-[#e9553f]"
                    />
                ) : (
                    <FaUserCircle className="w-28 h-28 text-[#e9553f]" />
                )}

                <h2 className="text-2xl font-bold mt-4">{user.displayName || 'User Name'}</h2>
                
                <p className="text-gray-500 mt-1 flex items-center gap-2">
                    <FaEnvelope /> {user.email || 'user@example.com'}
                </p>
               
                {user.phoneNumber && (
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <FaPhone /> {user.phoneNumber}
                    </p>
                )}
            </div>

          
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Full Name</h3>
                    <p>{user.displayName || 'N/A'}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p>{user.email || 'N/A'}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <p>{user.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Role</h3>
                    <p>{user.role || 'Vendor'}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    className="btn text-white border-none px-6"
                    style={{ backgroundColor: '#e9553f' }}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
