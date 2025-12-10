import React from 'react';
import Container from '../Container/Container';
import logo from '../../assets/logo-black.svg'
import { Link } from 'react-router';

const Navbar = () => {

    const nav = <>
        <li><a>Item 1</a></li>
        <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li>
        <li><a>Item 3</a></li>


    </>

    return (
        <div className=' bg-base-100 border-b-[.5px] border-gray-200 sticky top-0 z-50'>
            <Container>
                <div className="navbar">

                    <div className="navbar-start">

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                               {nav}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl"><img src={logo} alt="Logo" /></a>


                          <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {nav}
                        </ul>
                    </div>
                    </div>

                    
                  

                    <div className="navbar-end md:space-x-3">
                        {/* <Link className="text-[16px] font-medium">+1800900122</Link> */}
                        <Link className="text-[16px] text-black underline font-medium">Sign In</Link>
                        <button className="btn bg-none border-[1px] font-medium text-black text-[16px] border-black">Sign Up</button>
                        <button className="btn bg-black text-white font-medium text-[16]">Be A Vendor</button>
                    </div>

                </div>

            </Container>
        </div>
    );
};

export default Navbar;