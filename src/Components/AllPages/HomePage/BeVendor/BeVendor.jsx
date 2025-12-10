import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Container from "../../../Container/Container";
import { FaArrowRightArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";


const BeVendor = () => {
  return (
    <div className="bg-[#181A1F] text-white py-20 px-[20px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-4">
              Want to <span className="text-[#e95440]">Sell Your Ticket?</span>
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Turn your unused or extra tickets into instant cash.  
              Join our vendor program and reach thousands of buyers every day.
              Selling has never been this simple, secure, and fast.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[#e95440] text-xl mt-1" />
                <p>List your tickets in minutes with easy posting tools.</p>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[#e95440] text-xl mt-1" />
                <p>Reach a large audience actively searching for tickets.</p>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[#e95440] text-xl mt-1" />
                <p>Secure payouts directly to your preferred account.</p>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[#e95440] text-xl mt-1" />
                <p>24/7 support to help you sell faster and smoother.</p>
              </div>
            </div>
                <button className="cursor-pointer mt-8 px-8 py-3 bg-[#e95440] text-white py-2 rounded-[5px] flex justify-center items-center gap-2 hover:bg-[#cf4c39] transition">
                            See Details <FaArrowUpRightFromSquare />
                          </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlYWNofGVufDB8fDB8fHww"
              alt="Vendor"
              width={100}
              className="rounded-xl w-full  shadow-lg"
            />
          </div>
      
        </div>
      </Container>
    </div>
  );
};

export default BeVendor;
