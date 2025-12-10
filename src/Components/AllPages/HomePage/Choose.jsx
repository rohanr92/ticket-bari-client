import React from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import Container from "../../Container/Container";

const Choose = () => {
  return (
    <div className="bg-black text-white py-20 px-4">
        <Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE BOX */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://img.freepik.com/free-photo/business-people-shaking-hands-car-dealership_1303-28605.jpg?w=900"
            alt="Car Deal"
            className="w-full h-full object-cover"
          />

          {/* Play Button */}
          <button
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="bg-[#e9553f] text-black p-6 rounded-full shadow-lg hover:scale-105 transition-all">
              <FaPlay size={28} />
            </span>
          </button>

          {/* Bottom Text */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <h2 className="text-2xl font-bold mb-1">The Key to Your Next Journey.</h2>
            <p className="text-gray-300 text-sm">Rent Smart. Travel Easy.</p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Badge */}
          <p className="inline-block bg-[#e9553f]/20 text-[#e9553f] px-4 py-2 rounded-xl text-sm font-semibold mb-4">
            Most Trusted Ticket Booking Platform
          </p>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Book Your Tickets Instantly <br />
           Safe, Fast & Hassle-Free.
          </h1>

          {/* Sub text */}
          <p className="text-gray-300 mb-8 text-[17px] leading-7">
           Whether you're traveling by bus, launch, train, or plane—our platform makes ticket booking easier than ever.
Enjoy transparent pricing, verified operators, and a seamless booking experience designed for comfort and reliability.
          </p>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[17px]">
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> Trusted Transport Operators
            </p>
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> Instant Booking Confirmation
            </p>
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> Lowest & Fair Price Guarantee
            </p>
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> 24/7 Customer Support
            </p>
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> Secure Online Payment System
            </p>
            <p className="flex items-center gap-3">
              <FaCheckCircle className="text-[#e9553f]" /> Easy Cancellation Options
            </p>
          </div>
        </div>

      </div>
      </Container>
    </div>
  );
};

export default Choose;
