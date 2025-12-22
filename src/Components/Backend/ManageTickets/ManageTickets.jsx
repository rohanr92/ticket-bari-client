import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch pending tickets
  useEffect(() => {
    axios
      .get("https://go-ticket-server.vercel.app/ticket-coll-pending")
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔹 Approve ticket
  const handleApprove = (id) => {

const updatedTicket = {

verificationStatus: 'approved'

}

    Swal.fire({
      title: "Approve this ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://go-ticket-server.vercel.app/ticket-coll/${id}`, updatedTicket)
          .then(() => {
            Swal.fire("Approved!", "Ticket is now live.", "success");

            // 🔄 Update UI instantly
            setTickets((prev) => prev.filter((t) => t._id !== id));
          });
      }
    });
  };

  // 🔹 Reject ticket
  const handleReject = (id) => {
    const updatedTicket = {

verificationStatus: 'rejected'

}
    Swal.fire({
      title: "Reject this ticket?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://go-ticket-server.vercel.app/ticket-coll/${id}`, updatedTicket)
          .then(() => {
            Swal.fire("Rejected!", "Ticket has been rejected.", "success");

            // 🔄 Update UI instantly
            setTickets((prev) => prev.filter((t) => t._id !== id));
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading pending tickets...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Manage Tickets (Pending Approval)
      </h2>

      {/* No Tickets */}
      {tickets.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No pending tickets for approval
        </p>
      )}

      {/* DaisyUI Table */}
      {tickets.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Route</th>
                <th>Transport</th>
                <th>Price</th>
                <th>Departure</th>
                <th>Vendor</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{ticket.title}</td>
                  <td>
                    {ticket.fromLocation} → {ticket.toLocation}
                  </td>
                  <td>{ticket.transportType}</td>
                  <td>৳{ticket.pricePerUnit}</td>
                  <td>
                    {ticket.departureDate}
                    <br />
                    <span className="text-sm text-gray-500">
                      {ticket.departureTime}
                    </span>
                  </td>
                  <td>{ticket.vendorEmail}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(ticket._id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(ticket._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
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

export default ManageTickets;
