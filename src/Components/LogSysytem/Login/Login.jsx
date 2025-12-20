import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';
import { AuthContext } from '../../Provider/AuthContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleLogin, setUser } = useContext(AuthContext);
    const [firebaseError, setFirebaseError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (data) => {
        setFirebaseError("");
        setSubmitting(true);

        signIn(data.email, data.password)
            .then(userCredential => {
                const user = userCredential.user;
                setUser(user);
                console.log("Logged in user:", user);
                navigate('/');
                
            })
            .catch(error => {
                console.error("Login error:", error);
                setFirebaseError(error.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleGoogleLogin = () => {
        setFirebaseError("");
        setSubmitting(true);

        googleLogin()
            .then(result => {
                const user = result.user;
                setUser(user);
                console.log("Google login user:", user);
                navigate('/');
            })
            .catch(error => {
                console.error("Google login error:", error);
                setFirebaseError(error.message);
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Container>
            <div className="w-full my-[40px] md:min-h-screen flex flex-col md:flex-row items-center">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Login to Your Account
                        </h2>

                        <form onSubmit={handleSubmit(handleLogin)}>
                            {/* Email */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter your email"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label className="text-gray-700 font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter your password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Firebase error */}
                            {firebaseError && <p className="text-red-500 text-sm mb-2">{firebaseError}</p>}

                            {/* Login button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 text-white font-semibold rounded-xl ${submitting ? 'bg-gray-400' : 'bg-black hover:bg-indigo-700'}`}
                            >
                                {submitting ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="text-right mt-2">
    <Link
        to="/auth/forgot-pass"
        className="text-sm text-indigo-600 hover:underline"
    >
        Forgot Password?
    </Link>
</div>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Google login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={submitting}
                            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                        >
                            <FcGoogle size={26} />
                            <span className="font-medium text-gray-700">Login with Google</span>
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

export default Login;
