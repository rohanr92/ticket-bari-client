import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaAngleRight } from "react-icons/fa6";
import { FreeMode, Pagination } from "swiper/modules";
import Container from "../../../Container/Container";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft } from "react-icons/fa6";

// React Icons
import {
  FaShip,
  FaBus,
  FaCar,
  FaCheckCircle,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";
import SkeletonCard from "./Skeleton";

const Sponsored = () => {
  const { data: sponsored = [], isLoading } = useQuery({
    queryKey: ["sponsored"],
    queryFn: () => fetch("/sponsored.json").then((res) => res.json()),
  });

  // Icon for transport
  const getTransportIcon = (type) => {
    switch (type) {
      case "ship":
        return <FaShip />;
      case "bus":
        return <FaBus />;
      case "car":
        return <FaCar />;
      default:
        return <FaCar />;
    }
  };

  // Random travel time generator
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 10) + 1;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Container>
          <div className="text-center mb-[28px]">
            <h2 className="text-[25px] md:text-[40px] font-[700]">
              Browse By <span className="text-[#e95440]">Transportation</span> Type
            </h2>
          </div>

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            freeMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
              breakpoints={{
    0: {       // Mobile
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {     // Tablet
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {    // Desktop
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}

          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SwiperSlide key={n}>
                <SkeletonCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20 mx-[15px]">
      <Container>
        <div className=" text-center mb-[28px]">
          <h2 className="md:text-[40px] font-[700] text-[30px]">
            Sponsored Transport
          </h2>
        </div>

     
  <div className="relative">
     <button
    className="custom-prev absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white transition"
  >
   <FaAngleLeft />
  </button>

  <button
    className="custom-next absolute cursor-pointer  right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white transition"
  >
    <FaAngleRight />
  </button>
 
        <Swiper
           slidesPerView={3}
            spaceBetween={30}
            loop={true}
            freeMode={true}
             navigation={{
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    }}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
              breakpoints={{
    0: {       // Mobile
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {     // Tablet
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {    // Desktop
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}

        >
          {sponsored.slice(0, 6).map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl border border-gray-200 hover:shadow-lg transition p-4">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.ticketTitle}
                  className="w-full h-48 object-cover rounded-lg"
                />

                {/* Title */}
                <h3 className="text-xl font-semibold mt-3">{item.ticketTitle}</h3>

                {/* Route */}
                <div className="mt-2 font-medium text-gray-700 text-sm">
                  {item.route}
                </div>

                {/* Time Bar */}
                <div className="flex flex-col items-center mt-2 mb-2">
                  <p className="text-gray-600 text-sm">{generateRandomTime()}</p>

                  <div className="flex items-center w-full justify-center mt-1">
                    <div className="bg-[#e95440] text-white p-2 rounded-full flex items-center justify-center">
                      {getTransportIcon(item.transportType)}
                    </div>

                    <div className="flex-1 h-[4px] bg-[#e95440] mx-2 rounded"></div>

                    <div className="w-3 h-3 bg-[#e95440] rounded-full"></div>
                  </div>
                </div>

                <div className="divider my-1"></div>

                {/* Price */}
                <p className="text-gray-700 mt-1">
                  <span className="font-bold text-[#e95440]">${item.pricePerUnit}</span> / per unit
                </p>

                {/* Ticket Quantity */}
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <FaTicketAlt className="text-[#e95440]" />
                  <span>Available: {item.ticketQuantity}</span>
                </div>

                {/* Transport Type */}
                <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
                  <span className="text-[#e95440]">{getTransportIcon(item.transportType)}</span>
                  <span className="capitalize">{item.transportType}</span>
                </div>

                {/* Perks */}
                <div className="mt-3">
                  {item.perks.slice(0, 3).map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <FaCheckCircle className="text-green-500" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="cursor-pointer mt-4 w-full bg-[#e95440] text-white py-2 rounded-[5px] flex justify-center items-center gap-2 hover:bg-[#cf4c39] transition">
                  See Details <FaArrowRight />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
         </div>
      </Container>
    </div>
  );
};

export default Sponsored;
