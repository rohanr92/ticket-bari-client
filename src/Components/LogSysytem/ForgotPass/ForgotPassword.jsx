import React, { useContext, useState } from 'react';
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';
import { AuthContext } from '../../Provider/AuthContext';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { forgotPass } = useContext(AuthContext);
    const [success, setSuccess] = useState("");
    const [firebaseError, setFirebaseError] = useState("");


    const handleForget = (data) => {
        console.log(data.email);
        setSuccess("");
        setFirebaseError("");

        forgotPass(data.email)
            .then(() => {
                setSuccess("Password reset link sent to your email");
            })
            .catch((error) => {
                setFirebaseError(error.message);
            });



    }

    return (

        <Container>
            <div className="w-full my-[40px] md:min-h-screen flex flex-col md:flex-row items-center">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Forgot Password
                        </h2>

                        <form onSubmit={handleSubmit(handleForget)}>
                            {/* Email */}
                            <div className="mb-6">
                                <label className="text-gray-700 font-medium">Email</label>
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {success && (
                                <p className="text-green-600 text-sm mb-3">
                                    {success}
                                </p>
                            )}

                            {firebaseError && (
                                <p className="text-red-500 text-sm mb-3">
                                    {firebaseError}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button className="w-full py-3 bg-black hover:bg-indigo-700 transition text-white font-semibold rounded-xl">
                                Send Reset Link
                            </button>
                        </form>

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

export default ForgotPassword;
