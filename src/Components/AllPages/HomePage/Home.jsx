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
import Choose from './Choose';
import Blog from './Blog/Blog';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Marquees></Marquees>
            <ByType></ByType>
            <Sponsored></Sponsored>
            <BeVendor></BeVendor>
            <Latest></Latest>
            <Choose></Choose>
            <Process></Process>
            <Testimonial></Testimonial>
            <PopularRoutes></PopularRoutes>
            <Blog></Blog>
            
        </div>
    );
};

export default Home;