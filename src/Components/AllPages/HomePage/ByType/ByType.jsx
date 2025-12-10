import React from 'react';
import { PiTrainSimpleBold } from "react-icons/pi";
import { BsBusFront } from "react-icons/bs";
import Container from '../../../Container/Container';
import { PiAirplaneTilt } from "react-icons/pi";
import { GiSinkingShip } from "react-icons/gi";




const ByType = () => {
    return (
        <div className='my-12 px-[15px]'>
            <Container>
                <div className='md:text-[40px] font-[700] text-center mb-[28px]'>
                    <h2> Browse By<span className='text-[#e95440]'> Transportation</span> Type</h2>

                </div>

                <div className='text-center place-items-center'>
                    <div className='md:flex md:justify-center md:gap-10 space-y-4 md:space-y-0 w-full place-items-center'>

                        <div className="place-items-center border-[1px] w-full md:w-auto cursor-pointer hover:border-[#e95440] border-gray-200 text-center py-10 px-15 space-y-4">
                            <PiTrainSimpleBold className="text-[40px]" />
                            <h3 className="text-[16px] font-medium">Train Ticket</h3>
                        </div>

                        <div className='place-items-center border-[1px] w-full md:w-auto cursor-pointer hover:border-[#e95440] border-gray-200 text-center py-10 px-15 space-y-4'>
                            <BsBusFront className='text-[35px]' />
                            <h3 className='text-[16px] font-medium'>Bus Ticket</h3>
                        </div>
                        <div className='place-items-center border-[1px] w-full md:w-auto cursor-pointer hover:border-[#e95440] border-gray-200 text-center py-10 px-15 space-y-4'>
                            <PiAirplaneTilt className='text-[40px]' />
                            <h3 className='text-[16px] font-medium'>Air Plane Ticket</h3>
                        </div>
                        <div className='place-items-center border-[1px] w-full md:w-auto cursor-pointer hover:border-[#e95440] border-gray-200 text-center py-10 px-15 space-y-4'>
                            <GiSinkingShip className='text-[40px]' />
                            <h3 className='text-[16px] font-medium'>Ship Ticket</h3>
                        </div>





                    </div>



                </div>



            </Container>

        </div>
    );
};

export default ByType;