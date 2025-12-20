import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import svg from '../../../assets/ljs.json';
import Container from '../../Container/Container';
import { AuthContext } from '../../Provider/AuthContext';
import { useForm } from "react-hook-form"
import axios from 'axios';

const VendorSign = () => {
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

                        // const newUpdateProfile = {
                        //     displayName: data.fullName,
                        //     photoURL: imageUrl
                        // }

                        updatedProfile(data.fullName, imageUrl)
                            .then(() => {
                                console.log("Profile updated successfully");



                                setUser({
                                    ...users,
                                    displayName: data.fullName,
                                    photoURL: imageUrl
                                });

                            }).catch((error) => {
                                console.error("Profile update error:", error);
                            });

                            alert('Account Create SuccessFully')




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
                            Vendor Form
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
                                <label className="text-gray-700 font-medium">NID Number</label>
                                <input
                                    {...register("NID", {
                                        required: "NID is required",
                                        
                                    })}
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                                    placeholder="Enter NID number"
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
                                {submitting ? 'Creating...' : 'Create Vendor Account'}
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

export default VendorSign;