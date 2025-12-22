import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AddedTickets = () => {
    const { user, loading } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`https://go-ticket-server.vercel.app/user-ticket-coll?email=${user.email}`)
            .then(res => {
                setTickets(res.data);
            });
    }, [user?.email]);

    console.log(tickets);
    const navigate = useNavigate();

  const handleSeeDetails = (id) => {
  navigate(`/dashboard/update-tickets/${id}`);
};

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`https://go-ticket-server.vercel.app/ticket-coll/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
           
            setTickets(prev =>
              prev.filter(ticket => ticket._id !== id)
            );

            Swal.fire({
              title: "Deleted!",
              text: "Ticket has been deleted.",
              icon: "success"
            });
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Delete failed", "error");
        });
    }
  });
};


    

    if (loading) {
        return <p className="text-center mt-10 text-lg">Loading tickets...</p>;
    }


    

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
                My Added Tickets
            </h2>

            {tickets.length === 0 && (
                <p className="text-center text-gray-500 text-lg">
                    No tickets found
                </p>
            )}

            {/* 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map(ticket => (
                    <div
                        key={ticket._id}
                        className="border rounded-2xl shadow-lg p-6 bg-white"
                    >
                        {/* TITLE */}
                        <h3 className="text-xl font-bold mb-3">
                            {ticket.title}
                        </h3>

                        {/* ROUTE */}
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Route:</span>{" "}
                            {ticket.fromLocation} → {ticket.toLocation}
                        </p>

                        {/* TRANSPORT */}
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Transport:</span>{" "}
                            {ticket.transportType}
                        </p>

                        {/* DATE & TIME */}
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Departure:</span>{" "}
                            {ticket.departureDate}
                        </p>

                        {/* PRICE */}
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Price:</span>{" "}
                            ৳{ticket.pricePerUnit}
                        </p>

                        {/* STATUS – VERY CLEAR */}
                        <div className="my-4">
                            <p className="text-lg font-semibold mb-2">
                                Verification Status
                            </p>

                            {ticket.verificationStatus === "pending" && (
                                <div className="bg-yellow-300 text-black text-center py-2 rounded-lg text-lg font-bold">
                                    PENDING
                                </div>
                            )}

                            {ticket.verificationStatus === "approved" && (
                                <div className="bg-green-600 text-white text-center py-2 rounded-lg text-lg font-bold">
                                    APPROVED
                                </div>
                            )}

                            {ticket.verificationStatus === "rejected" && (
                                <div className="bg-red-600 text-white text-center py-2 rounded-lg text-lg font-bold">
                                    REJECTED
                                </div>
                            )}
                        </div>

                        {/* BUTTONS – BIG & CLEAR */}
                        <div className="flex gap-4 mt-6">
                            <button 
                                className="w-1/2 py-3 text-lg font-semibold rounded-lg border border-black hover:bg-black hover:text-white transition"
                                onClick={() => handleSeeDetails(ticket._id)}
                            >
                                Update
                            </button>

                            <button
                                className="w-1/2 py-3 text-lg font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                onClick={() => handleDelete(ticket._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddedTickets;
