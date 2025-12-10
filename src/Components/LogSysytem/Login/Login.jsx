import React from 'react';
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';

const Login = () => {
    return (
        <Container>
            <div className="w-full my-[40px] md:min-h-screen items-center flex md:flex-col md:flex-row">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Login to Your Account
                        </h2>

                        <form>
                            {/* Username */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Username</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter username"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label className="text-gray-700 font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter password"
                                />
                            </div>

                            {/* Login Button */}
                            <button className="w-full py-3 bg-black hover:bg-indigo-700 transition text-white font-semibold rounded-xl">
                                Login
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Google Login */}
                        <button className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                            <FcGoogle size={26} />
                            <span className="font-medium text-gray-700">Login with Google</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - LOTTIE ANIMATION */}
                <div className="hidden md:flex w-0 md:w-1/2 items-center justify-center bg-white p-6">
                    <Lottie 
                        animationData={svg} 
                        loop={true} 
                        className="w-full max-w-[400px]" 
                    />
                </div>

            </div>
        </Container>
    );
};

export default Login;
