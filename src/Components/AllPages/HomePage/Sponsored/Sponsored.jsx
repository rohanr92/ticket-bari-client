import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, FreeMode, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Container from "../../../Container/Container";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "./Skeleton";

// Icons
import {
  FaShip,
  FaBus,
  FaCar,
  FaCheckCircle,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";

const Sponsored = () => {

  const { data: sponsored = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/advertised-tickets");
      return res.json();
    }
  });

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

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 10) + 1;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    return `${hours}h ${minutes}m`;
  };

  // 🔄 Loading Skeleton
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Container>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop
            navigation
            modules={[FreeMode, Pagination, Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[1, 2, 3, 4, 5, 6].map(n => (
              <SwiperSlide key={n}>
                <SkeletonCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    );
  }

  // ❌ No sponsored tickets
  if (!sponsored.length) return null;

  return (
    <div className="mt-10 mb-20 mx-[15px]">
      <Container>
        <h2 className="text-center md:text-[40px] text-[30px] font-bold mb-6">
          Sponsored Transport
        </h2>

        <div className="relative">
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white">
            <FaAngleLeft />
          </button>

          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white">
            <FaAngleRight />
          </button>

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {sponsored.slice(0, 6).map(ticket => (
              <SwiperSlide key={ticket._id}>
                <div className="border rounded-xl p-4 hover:shadow-lg transition">

                  <img
                    src={ticket.image || "/placeholder.jpg"}
                    alt={ticket.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-xl font-semibold mt-3">
                    {ticket.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    {ticket.fromLocation} → {ticket.toLocation}
                  </p>

                  <div className="text-center my-2 text-sm text-gray-500">
                    {generateRandomTime()}
                  </div>

                  <p className="text-[#e95440] font-bold">
                    ৳{ticket.pricePerUnit} / unit
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaTicketAlt />
                    Available: {ticket.ticketQuantity}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {getTransportIcon(ticket.transportType)}
                    <span className="capitalize">{ticket.transportType}</span>
                  </div>

                  <button className="mt-4 w-full bg-[#e95440] text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-[#cf4c39]">
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
