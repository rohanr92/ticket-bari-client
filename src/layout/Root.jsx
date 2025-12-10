import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <section className='min-h-screen'>
            <Outlet></Outlet>
             </section>
            <Footer></Footer>
           
            
        </div>
    );
};

export default Root;