import React from 'react';
import { useQuery } from '@tanstack/react-query';

const AdvertiseTickets = () => {

  const {
    data: tickets = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['approvedTickets'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/ticket-coll');
      return res.json();
    }
  });

  const advertisedCount = tickets.filter(t => t.isAdvertised).length;

  const handleToggle = async (ticket) => {
    if (!ticket.isAdvertised && advertisedCount >= 6) {
      alert("You can advertise only 6 tickets");
      return;
    }

    await fetch(
      `http://localhost:3000/advertise-ticket/${ticket._id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isAdvertised: !ticket.isAdvertised
        })
      }
    );

    refetch();
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Advertise Tickets ({advertisedCount}/6)
      </h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Route</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Advertise</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td className="p-2 border">{ticket.title}</td>
              <td className="p-2 border">
                {ticket.fromLocation} → {ticket.toLocation}
              </td>
              <td className="p-2 border">৳{ticket.pricePerUnit}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleToggle(ticket)}
                  className={`px-4 py-1 rounded text-white ${
                    ticket.isAdvertised
                      ? 'bg-red-500'
                      : 'bg-green-500'
                  }`}
                >
                  {ticket.isAdvertised ? 'Unadvertise' : 'Advertise'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
