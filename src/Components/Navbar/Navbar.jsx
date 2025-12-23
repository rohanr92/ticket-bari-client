import React, { useContext, useState } from 'react';
import Container from '../Container/Container';
import logo from '../../assets/logo-black.svg'
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const Navbar = () => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    console.log(user);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                alert("Sign Out Successfully")
            }).catch((error) => {
                alert(error.message)
            });



    }



    const nav = <>
        <li><Link to='/'>Home</Link></li>

          <li>
    <Link to='/all-tickets'>All Tickets</Link>
                </li>
        {user && (
            <>
              
                <li><Link to='/dashboard/overview'>Dashboard</Link></li>

            </>
        )}

        <li><Link to='/about-us'>About Us</Link></li>
        <li><Link to='/contact us'>Contact Us</Link></li>


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
                        <a href='/' className="btn btn-ghost text-xl"><img src={logo} alt="Logo" /></a>


                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {nav}
                            </ul>
                        </div>
                    </div>




                    <div className="navbar-end md:space-x-3">
                        {/* <Link className="text-[16px] font-medium">+1800900122</Link> */}
                        {user ? <>
                            <Link to='/auth/be-a-vendor' className="btn bg-black text-white font-medium text-[16]">Be A Vendor</Link>


                            <img src={user?.photoURL} alt="" 
                                onClick={() => setOpen(!open)}
                                className='rounded-4xl object-cover cursor-pointer h-[50px] w-[50px]' />


                            {/* Dropdown */}
                            {open && (
                                <div className="absolute right-0 top-14 bg-base-100 w-40 rounded-box shadow-lg z-50">
                                    <ul className="menu p-2">
                                        <li><Link to="dashboard/profile">My Profile</Link></li>
                                        <li><Link to="/dashboard/overview">Dashboard</Link></li>
                                        <li>
                                            <button onClick={handleSignOut} className="text-red-500">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}



                        </> : <>
                            <Link to='/auth/sign-in' className="text-[16px] text-black underline font-medium">Sign In</Link>
                            <Link to='/auth/sign-up' className="btn bg-none border-[1px] font-medium text-black text-[16px] border-black">Sign Up</Link>
                            <Link to='/auth/be-a-vendor' className="btn bg-black text-white font-medium text-[16]">Be A Vendor</Link>



                        </>}
                    </div>

                </div>

            </Container>
        </div>
    );
};

export default Navbar;