import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';
import { AuthContext } from '../../Provider/AuthContext';
import { useForm } from "react-hook-form"
import axios from 'axios';


const SignUp = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [firebaseError, setFirebaseError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { loading, googleLogin, user, setUser, createUser, updatedProfile } = useContext(AuthContext);

    // const [image, setImage] = useState(null);
    // const [imageName, setImageName] = useState("No file selected");

    const watchedPhoto = watch("profilePhoto");

    // Upload Image State

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //     if (file) {
    //         setImageName(file.name);
    //     }
    // };


    const handleSimpleReg = (data) => {
        setFirebaseError("");
        setSubmitting(true);



        createUser(data.email, data.password)
            .then((userCredential) => {
                const users = userCredential.user;
                setUser(users);
                console.log("Firebase user object:", users);

                const imageFile = data.profilePhoto[0];

                const imagBB = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

                const formData = new FormData();
                formData.append("image", imageFile);
                axios.post(imagBB, formData)
                    .then(res => {
                        const imageUrl = res.data.data.url;
                        console.log("ImgBB Image URL:", imageUrl);

                        const newUser = {
                            displayName: data.fullName,
                            email: data.email,
                            photoURL: imageUrl,
                            role: "user",
                            emailVerified: data.emailVerified
                        }

                        updatedProfile(data.fullName, imageUrl)
                            .then(() => {

                                const newUser = {
                                    displayName: data.fullName,
                                    email: data.email,
                                    photoURL: imageUrl,
                                    role: "user",
                                    emailVerified: users.emailVerified,
                                    createdAt: new Date()
                                };

                                axios
                                    .post('http://localhost:3000/users-coll', newUser)
                                    .then(res => {
                                        console.log("User saved to DB:", res.data);

                                        setUser({
                                            ...users,
                                            displayName: data.fullName,
                                            photoURL: imageUrl
                                        });

                                        alert('Account Created Successfully');
                                    })
                                    .catch(dbError => {
                                        console.error("DB save error:", dbError);
                                        alert("Account created, but database save failed");
                                    });

                            })
                            .catch(error => {
                                console.error("Profile update error:", error);
                            });

                        // now you can save imageUrl to Firebase profile / DB
                    })
                    .catch(err => {
                        console.error("ImgBB upload error:", err);
                    });




            })
            .catch((error) => {
                console.log("Error creating user:", error.code, error.message);
                setFirebaseError(error.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
        console.log(data);
    };





    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {

                const user = result.user;
                console.log(user);


                 const newUser = {
                                    displayName: user.displayName,
                                    email: user.email,
                                    photoURL: user.photoURL,
                                    role: "user",
                                    emailVerified: user.emailVerified,
                                    createdAt: new Date()
                                };


                                console.log(newUser);



                                 axios
                                    .post('http://localhost:3000/users-coll', newUser)
                                    .then(res => {
                                        console.log("User saved to DB:", res.data);
                                        alert('Account Created Successfully');
                                    })
                                    .catch(error => {
                                        console.error("DB save error:", error);
                                    });
                                
                


                



            }).catch((error) => {

            });

    }
    // if (loading) {
    //     return <p>loading....</p>
    // }


    return (
        <Container>
            <div className="w-full my-[40px] md:min-h-screen flex flex-col md:flex-row items-center">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Create Your Account
                        </h2>

                        <form onSubmit={handleSubmit(handleSimpleReg)}>

                            {/* FULL NAME */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter full name"
                                    {...register("fullName", { required: 'Full name is required', maxLength: 20 })}
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Email</label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            {/* PROFILE IMAGE UPLOAD */}
                            <div className="mb-5">
                                <label className="text-gray-700 font-medium">Profile Image</label>
                                <div className="flex items-center gap-4 mt-3">
                                    <div>
                                        <input
                                            {...register("profilePhoto", { required: "Profile photo is required" })}
                                            type="file"
                                            accept="image/*"
                                            id="upload"
                                            className="hidden"
                                        />

                                        <label
                                            htmlFor="upload"
                                            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            <FaUpload /> Upload Image
                                        </label>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {watchedPhoto?.length > 0 ? watchedPhoto[0].name : "No file selected"}
                                        </p>
                                        {errors.profilePhoto && (
                                            <p className="text-red-500 text-sm">{errors.profilePhoto.message}</p>
                                        )}
                                        {watchedPhoto?.length > 0 && (
                                            <img
                                                src={URL.createObjectURL(watchedPhoto[0])}
                                                alt="preview"
                                                className="w-16 h-16 rounded-full border object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-4">
                                <label className="text-gray-700 font-medium">Password</label>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message: "Password must include uppercase, lowercase, number, and special character",
                                        },
                                    })}
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            {firebaseError && (
                                <p className="text-red-500 text-sm mb-2">{firebaseError}</p>
                            )}

                            {/* SIGNUP BUTTON */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 text-white font-semibold rounded-xl ${submitting ? 'bg-gray-400' : 'bg-black hover:bg-indigo-700'}`}
                            >
                                {submitting ? 'Signing Up...' : 'Sign Up'}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* GOOGLE LOGIN */}
                        <button onClick={handleGoogleLogin} className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
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
