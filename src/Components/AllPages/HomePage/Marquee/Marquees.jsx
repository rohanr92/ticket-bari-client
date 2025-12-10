import React from 'react';
import Marquee from "react-fast-marquee";
import air from '../../../../assets/air.svg'; 
import eb from '../../../../assets/eb.svg'; 
import nba from '../../../../assets/nba.svg'; 
import nla from '../../../../assets/nla.svg'; 

const Marquees = () => {
    return (
        <div className='p-4'>
            <h5 className='text-center font-medium text-[16px]'>Click to learn more about our sustainability partners</h5>
            <Marquee speed={30} className='my-4 mt-6'>
                <img src={air} alt="Air" className='md:mx-15 mx-6'/>
                <img src={eb} alt="EB"  className='md:mx-15 mx-6' />
                <img src={nba} alt="NBA"   className='md:mx-15 mx-6'/>
                <img src={nla} alt="NLA"   className='md:mx-15 mx-6'/>
                  <img src={air} alt="Air"   className='md:mx-15 mx-6'/>
                <img src={eb} alt="EB"  className='md:mx-15 mx-6' />
  
            </Marquee>
        </div>
    );
};

export default Marquees;