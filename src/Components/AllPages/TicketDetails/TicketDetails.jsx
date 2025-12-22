import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import Countdown from "react-countdown";
import { FaMapMarkerAlt, FaBus, FaClock, FaTicketAlt } from "react-icons/fa";
import Container from "../../Container/Container";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";

const TicketDetails = () => {
    const ticket = useLoaderData();
    const [qty, setQty] = useState(1);
    const [canBook, setCanBook] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const departureDateTime = new Date(`${ticket.departureDate}T${ticket.departureTime}:00`);
        const now = new Date();
        setCanBook(!(departureDateTime <= now || ticket.ticketQuantity === 0));
    }, [ticket]);

    const openModal = () => {
        const modal = document.getElementById("book_modal");
        if (modal) modal.showModal();
    };
    console.log(ticket);
    

    const handleDialog = (e) => {
        e.preventDefault();


        const email = e.target.email.value;
        const quantity = Number(e.target.quantity.value);
        const pricePerUnit = ticket.pricePerUnit;


        const booking = {
            ticketId: ticket._id,
            title: ticket.title,
            from: ticket.fromLocation,
            to: ticket.toLocation,
            transportType: ticket.transportType,
            pricePerUnit: ticket.pricePerUnit,
            bookingEmail: email,
            vendorsEmail: ticket.vendorEmail,
            quantity,
            totalPrice: pricePerUnit * quantity,
            bookingStatus: 'pending',
            departuresDate: ticket.departureDate,
            departuresTime: ticket.departureTime,
            imageUrl: ticket.image

        };

        console.log("Booking Data:", booking);

        axios.post('http://localhost:3000/booking-ticket', booking)
            .then(res => {
                console.log("User saved to DB:", res.data);
                alert(`Successfully booked ${quantity} ticket(s) for ${ticket.title}!`);
            })
            .catch(dbError => {
                console.error("DB save error:", dbError);
                alert("Booking Failed");
            });

        

        const modal = document.getElementById("book_modal");
        if (modal) modal.close();
    };

    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) return <span className="text-red-500 font-bold">Departure Passed</span>;
        return <span className="text-gray-700 font-semibold">{days}d {hours}h {minutes}m {seconds}s</span>;
    };

    return (
        <Container>
            {/* Hero Section */}
            <div className="min-h-screen mb-30 mt-15 p-8">
                <div className="w-full relative h-96 overflow-hidden rounded-xl shadow-lg">
                    <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 text-white bg-black bg-opacity-40 px-4 py-2 rounded-lg">
                        <h2 className="text-3xl font-bold">{ticket.title}</h2>
                        <p className="flex items-center gap-2 text-lg"><FaMapMarkerAlt /> {ticket.fromLocation} → {ticket.toLocation}</p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 md:gap-y-2 md:gap-8 mt-8">
                    {/* Left Section */}
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-4 text-gray-700">
                            <FaBus className="text-xl text-[#e9553f]" />
                            <span className="text-lg font-semibold">{ticket.transportType}</span>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FaClock className="text-[#e9553f] text-xl" />
                                <div>
                                    <p className="font-semibold">Departure</p>
                                    <p>{ticket.departureDate} at {ticket.departureTime}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">Time Left</p>
                                <Countdown date={new Date(`${ticket.departureDate}T${ticket.departureTime}:00`)} renderer={countdownRenderer} />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold text-[#e9553f] mb-3">Included Amenities</h3>
                            <ul className="space-y-2 text-gray-700">
                                {ticket.perks?.map((perk, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <FaTicketAlt className="text-[#e9553f]" /> {perk}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-[#e9553f]">৳{ticket.pricePerUnit}</span>
                                <span className="text-sm text-gray-600">Available: {ticket.ticketQuantity}</span>
                            </div>

                            <p>Discover Serenity: Exploration & Enlightenment. Immerse yourself in guided tours, meditation, and scenic views. Book now to secure your spot!</p>

                            <button
                                onClick={openModal}
                                disabled={!canBook || qty < 1}
                                className={`w-full py-3 text-white font-semibold rounded-lg transition ${canBook && qty > 0 ? "bg-[#e9553f] hover:bg-[#d84930]" : "bg-gray-300 cursor-not-allowed"}`}
                            >
                                Book Now
                            </button>

                            {!canBook && (
                                <p className="text-red-500 text-sm text-center">
                                    Cannot book: past departure or no tickets left.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <dialog id="book_modal" className="modal">
                    <form method="dialog" className="modal-box space-y-4" onSubmit={handleDialog}>
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("book_modal").close()}
                        >
                            ✕
                        </button>
                        <img src={ticket.image} alt={ticket.title} className="w-full h-48 object-cover rounded-lg" />
                        <h2 className="text-2xl font-bold">{ticket.title}</h2>
                        <p><strong>From:</strong> {ticket.fromLocation} → <strong>To:</strong> {ticket.toLocation}</p>
                        <p><strong>Transport:</strong> {ticket.transportType}</p>
                        <p><strong>Price per unit:</strong> ৳{ticket.pricePerUnit}</p>
                        <p><strong>Available Tickets:</strong> {ticket.ticketQuantity}</p>

                        {/* Email Input */}
                        <div>
                            <label className="font-medium text-gray-700">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user?.email || ""}
                                readOnly
                                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9553f] w-full mt-1"
                            />
                        </div>

                        {/* Quantity Input */}
                        <div>
                            <label className="font-medium text-gray-700">Select Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                min={1}
                                max={ticket.ticketQuantity}
                                value={qty}
                                onChange={(e) => setQty(Math.max(1, Math.min(ticket.ticketQuantity, e.target.value)))}
                                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9553f] w-full mt-1"
                            />
                        </div>

                        {/* Confirm Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#e9553f] hover:bg-[#d84930] text-white py-2 rounded-lg font-semibold"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </dialog>
            </div>
        </Container>
    );
};

export default TicketDetails;
