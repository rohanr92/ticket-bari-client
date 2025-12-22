import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Load approved tickets on page load
  useEffect(() => {
    fetch("http://localhost:3000/ticket-coll")
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.append("fromLocation", from);
    if (to) params.append("toLocation", to);
    if (date) params.append("departureDate", date);

    fetch(`http://localhost:3000/ticket-coll?${params.toString()}`)
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  };

const navigate = useNavigate();

  const handleSeeDetails = (id) => {
  navigate(`/all-tickets/${id}`);
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-wrap gap-4 justify-center sticky top-4 z-10"
      >
        <input
          type="text"
          placeholder="From"
          className="border rounded-full px-5 py-2 w-32 md:w-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          className="border rounded-full px-5 py-2 w-32 md:w-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="date"
          className="border rounded-full px-5 py-2 w-32 md:w-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-2 rounded-full font-medium hover:bg-orange-600 transition"
        >
          Search
        </button>
      </form>

      {/* Tickets */}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No tickets found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold">{ticket.title}</h2>
                <p className="text-gray-600">
                  {ticket.fromLocation} → {ticket.toLocation}
                </p>
                <p className="text-sm text-gray-500">
                  {ticket.departureDate} • {ticket.departureTime}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold text-lg">
                    ৳{ticket.pricePerUnit} / unit
                  </span>
                  <span className="text-sm text-gray-500">
                    Available: {ticket.ticketQuantity}
                  </span>
                </div>
                <div className="space-y-1">
                  {ticket.perks?.map((perk, i) => (
                    <p key={i} className="flex items-center gap-2 text-sm">
                      <FaCheckCircle className="text-green-500" />
                      {perk}
                    </p>
                  ))}
                </div>
                <button onClick={() => handleSeeDetails(ticket._id)} className="w-full mt-3 py-2 rounded-lg text-white font-medium bg-orange-500 hover:bg-orange-600 transition cursor-pointer">
                  See Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
