import React from "react";
import { FaAngleLeft, FaAngleRight, FaCheckCircle, FaQuoteRight } from "react-icons/fa";
import Container from "../../../Container/Container";
import { FaArrowRightArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { FreeMode, Pagination, Navigation } from "swiper/modules";


const Testimonial = () => {

    return (
        <div className="bg-[#181A1F] text-white py-20 px-[20px]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* LEFT SIDE */}
                    <div className="order-2 md:order-1 relative">

                          <Swiper
           slidesPerView={1}
            spaceBetween={30}
            loop={true}
            freeMode={true}
    //          navigation={{
    //   nextEl: ".custom-next",
    //   prevEl: ".custom-prev",
    // }}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"

        >

              {/* <button
                className="custom-prev absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white transition"
              >
               <FaAngleLeft />
              </button>
            
              <button
                className="custom-next absolute cursor-pointer  right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e95440] hover:text-white transition"
              ><FaAngleRight /></button> */}



              <SwiperSlide>
                              <div className="flex items-center gap-6">
                            <div className="text-[40px] p-[20px] text-black bg-white rounded-[8px]">
                                <FaQuoteRight />
                            </div>
                            <div>
                                <h2 className="text-[20px]">Osama Hossain Rohan</h2>
                                <p className="text-[16px]">Marketing Director</p>
                            </div>

                        </div>
                          {/* Star Rating Added Here*/}
                            <div className="flex text-[20px] gap-1.5 my-[30px] text-[#e95440]">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>


                        <p className="text-gray-300 mb-6  text-[24px] font-[600] leading-9">
                            On the other hand denounce righteous indignation and dislike men who beguile and demoralize charms pleasure the moment blinded desire cannot foresee pain and trouble that are bound to ensue
                        </p>

              </SwiperSlide>

                      <SwiperSlide>
                              <div className="flex items-center gap-6">
                            <div className="text-[40px] p-[20px] text-black bg-white rounded-[8px]">
                                <FaQuoteRight />
                            </div>
                            <div>
                                <h2 className="text-[20px]">Osama Hossain Rohan</h2>
                                <p className="text-[16px]">Marketing Director</p>
                            </div>

                        </div>
                          {/* Star Rating Added Here*/}
                            <div className="flex text-[20px] gap-1.5 my-[30px] text-[#e95440]">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>


                        <p className="text-gray-300 mb-6  text-[24px] font-[600] leading-9">
                            On the other hand denounce righteous indignation and dislike men who beguile and demoralize charms pleasure the moment blinded desire cannot foresee pain and trouble that are bound to ensue
                        </p>

              </SwiperSlide>


                      <SwiperSlide>
                              <div className="flex items-center gap-6">
                            <div className="text-[40px] p-[20px] text-black bg-white rounded-[8px]">
                                <FaQuoteRight />
                            </div>
                            <div>
                                <h2 className="text-[20px]">Osama Hossain Rohan</h2>
                                <p className="text-[16px]">Marketing Director</p>
                            </div>

                        </div>
                          {/* Star Rating Added Here*/}
                            <div className="flex text-[20px] gap-1.5 my-[30px] text-[#e95440]">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>


                        <p className="text-gray-300 mb-6  text-[24px] font-[600] leading-9">
                            On the other hand denounce righteous indignation and dislike men who beguile and demoralize charms pleasure the moment blinded desire cannot foresee pain and trouble that are bound to ensue
                        </p>

              </SwiperSlide>




        </Swiper>



          

                   
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex justify-center md:justify-end order-1 md:order-2">
                        <img
                            src="https://img.freepik.com/free-photo/woman-showing-ok-sign_23-2148990150.jpg?semt=ais_hybrid&w=740&q=80"
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

export default Testimonial;