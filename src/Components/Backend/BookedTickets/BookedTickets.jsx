import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Container from "../../Container/Container";
import Countdown from "react-countdown";

const BookedTickets = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/booking-ticket?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <span className="text-red-500 font-bold">Departure Passed</span>;
    return (
      <span className="text-gray-700 font-semibold">{days}d {hours}h {minutes}m {seconds}s</span>
    );
  };

const handlePayNow = async (booking) => {
  try {
    const res = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: booking.title,
          totalPrice: booking.totalPrice,
          quantity: booking.quantity,
          userEmail: user.email,
          imageUrl: booking.imageUrl,
          bookingId: booking._id,
        }),
      }
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Payment error", error);
  }
};



  if (loading) return <p className="text-center mt-10">Loading your booked tickets...</p>;

  if (bookings.length === 0) return <p className="text-center mt-10 text-gray-500">No booked tickets found.</p>;

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mb-8">My Booked Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const departureDateTime = new Date(`${booking.departuresDate}T${booking.departuresTime}:00`);
          const now = new Date();
          const canPay = departureDateTime > now && booking.bookingStatus === "approved";

          return (
            <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              {/* Replace this with ticket image if you have one */}
              <img
                src={booking.imageUrl || "https://via.placeholder.com/400x200.png?text=Ticket+Image"}
                alt={booking.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#e9553f]">{booking.title}</h2>
                <p className="text-gray-600 mt-1">{booking.from} → {booking.to}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Departure: {booking.departuresDate} at {booking.departuresTime}
                </p>

                <div className="mt-2">
                  <span className="font-semibold">Quantity:</span> {booking.quantity}
                </div>
                <div className="mt-1">
                  <span className="font-semibold">Total Price:</span> ৳{booking.totalPrice}
                </div>

                <div className="mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={`capitalize font-bold ${booking.bookingStatus === "pending" ? "text-yellow-500" :
                    booking.bookingStatus === "accepted" ? "text-green-500" :
                    booking.bookingStatus === "rejected" ? "text-red-500" :
                    "text-blue-500"}`}>
                    {booking.bookingStatus}
                  </span>
                </div>

                <div className="mt-2">
                  <span className="font-semibold">Time Left:</span>{" "}
                  <Countdown
                    date={departureDateTime}
                    renderer={countdownRenderer}
                  />
                </div>

               <div className="mt-4 flex flex-col gap-2">
  {booking.paymentStatus === "paid" ? (
    <div className="flex justify-between items-center">
      <span className="text-green-600 font-bold">Paid</span>
      <button
        onClick={() => window.open(`/print-ticket/${booking._id}`, "_blank")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
      >
        Print Ticket
      </button>
    </div>
  ) : (
    <button
      onClick={() => handlePayNow(booking)}
      disabled={!canPay}
      className={`mt-auto w-full py-2 rounded-lg text-white font-semibold transition ${
        canPay ? "bg-[#e9553f] hover:bg-[#d84930]" : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      Pay Now
    </button>
  )}
</div>

              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default BookedTickets;
