import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const RequestedBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const vendorEmail = "shellathemesupport@gmail.com";

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/booking-ticket-pending?email=${vendorEmail}`
      )
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch pending bookings:", err);
        setLoading(false);
      });
  }, []);

const handleAction = (id, action) => {
  const status =
    action === "accept" ? "approved" : "rejected";

  Swal.fire({
    title: "Are you sure?",
    text: `You want to ${action} this booking`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {

      axios
        .patch(
          `http://localhost:3000/booking-ticket-pending/${id}`,
          { bookingStatus: status }   // ✅ OBJECT
        )
        .then((res) => {
          Swal.fire(
            "Success",
            `Booking ${status} successfully`,
            "success"
          );

          // 🔄 Remove from UI
          setBookings((prev) =>
            prev.filter((booking) => booking._id !== id)
          );
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Update failed", "error");
        });
    }
  });
};


  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading pending bookings...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Requested Bookings
      </h2>

      {/* No Pending Tickets */}
      {bookings.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No pending tickets for approval
        </p>
      )}

      {/* Table */}
      {bookings.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Ticket Title</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">
                    {booking.bookingEmail}
                  </td>

                  <td>{booking.title}</td>

                  <td>
                    <span className="badge badge-info">
                      {booking.quantity}
                    </span>
                  </td>

                  <td className="font-bold text-green-600">
                    ৳ {booking.totalPrice}
                  </td>

                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        handleAction(booking._id, "accept")
                      }
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleAction(booking._id, "reject")
                      }
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

export default RequestedBooking;
