import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
          {/* <section className='min-h-screen'> */}
            <Outlet></Outlet>
             {/* </section> */}
            <Footer></Footer>
            
        </div>
    );
};

export default AuthLayout;