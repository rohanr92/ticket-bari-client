import React from 'react';
import Banner from './Banner/Banner';
import Marquees from './Marquee/Marquees';
import ByType from './ByType/ByType';
import Sponsored from './Sponsored/Sponsored';
import BeVendor from './BeVendor/BeVendor';
import Latest from './Latest/Latest';
import Process from './Process/Process';
import PopularRoutes from './PopularRoutes/PopularRoutes';
import Testimonial from './Testimonial/Testimonial';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Marquees></Marquees>
            <ByType></ByType>
            <Sponsored></Sponsored>
            <BeVendor></BeVendor>
            <Latest></Latest>
            <Process></Process>
            <PopularRoutes></PopularRoutes>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;