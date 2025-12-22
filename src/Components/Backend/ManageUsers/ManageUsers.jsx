import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch all users
    useEffect(() => {
        axios
            .get("https://go-ticket-server.vercel.app/users-coll")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setLoading(false);
            });
    }, []);

    console.log(users);


    // 🔹 Update role
    const handleRoleChange = (id, role) => {
        Swal.fire({
            title: `Make this user ${role}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .patch(`https://go-ticket-server.vercel.app/users-coll/${id}`, { role })
                    .then((res) => {
                        console.log(res.data);

                        Swal.fire("Updated!", `User is now ${role}`, "success");

                        // 🔄 Update UI instantly
                        setUsers((prev) =>
                            prev.map((user) =>
                                user._id === id ? { ...user, role } : user
                            )
                        );

                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to update role", "error");
                    });
            }
        });
    };

    if (loading) {
        return <p className="text-center mt-10 text-lg">Loading users...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Manage Users
            </h2>

            {/* No Users */}
            {users.length === 0 && (
                <p className="text-center text-gray-500 text-lg">
                    No users found
                </p>
            )}

            {/* DaisyUI Table */}
            {users.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                    <table className="table table-zebra w-full">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>

                                    <td className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img
                                                    src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                                    alt="user"
                                                />
                                            </div>
                                        </div>
                                        <span className="font-semibold">
                                            {user.displayName || "N/A"}
                                        </span>
                                    </td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span
                                            className={`badge font-semibold ${user.role === "admin"
                                                    ? "badge-success"
                                                    : user.role === "vendor"
                                                        ? "badge-warning"
                                                        : "badge-info"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="flex gap-2 justify-center">
                                        <button
                                            disabled={user.role === "admin"}
                                            onClick={() => handleRoleChange(user._id, "admin")}
                                            className="btn btn-success btn-sm"
                                        >
                                            Make Admin
                                        </button>

                                        <button
                                            disabled={user.role === "vendor"}
                                            onClick={() => handleRoleChange(user._id, "vendor")}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Make Vendor
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
