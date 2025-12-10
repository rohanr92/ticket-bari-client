import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <section className='min-h-screen'>
            <Outlet></Outlet>
            </section>
            
        </div>
    );
};

export default Root;