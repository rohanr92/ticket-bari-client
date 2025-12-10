import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';

const SignUp = () => {

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("No file selected");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImageName(file.name);
        }
    };

    return (
        <Container>
            <div className="w-full my-[40px] md:min-h-screen flex flex-col md:flex-row items-center">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                        
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Create Your Account
                        </h2>

                        <form>

                            {/* FULL NAME */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter full name"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter email"
                                />
                            </div>

                            {/* PROFILE IMAGE UPLOAD */}
                            <div className="mb-5">
                                <label className="text-gray-700 font-medium">Profile Image</label>

                                <div className="flex items-center gap-4 mt-3">

                                    {/* Upload Button */}
                                    <div>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            id="upload"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />

                                        <label 
                                            htmlFor="upload"
                                            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            <FaUpload /> Upload Image
                                        </label>

                                        {/* File Name */}
                                        <p className="text-sm text-gray-600 mt-2">{imageName}</p>
                                    </div>

                                    {/* Image Preview */}
                                    {image && (
                                        <img 
                                            src={URL.createObjectURL(image)} 
                                            alt="preview"
                                            className="w-16 h-16 rounded-full border border-gray-300 object-cover" 
                                        />
                                    )}

                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter password"
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="mb-6">
                                <label className="text-gray-700 font-medium">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Re-enter password"
                                />
                            </div>

                            {/* SIGNUP BUTTON */}
                            <button className="w-full py-3 bg-black hover:bg-indigo-700 transition text-white font-semibold rounded-xl">
                                Sign Up
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* GOOGLE LOGIN */}
                        <button className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                            <FcGoogle size={26} />
                            <span className="font-medium text-gray-700">Sign Up with Google</span>
                        </button>

                    </div>
                </div>

                {/* RIGHT SIDE - LOTTIE */}
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

export default SignUp;
