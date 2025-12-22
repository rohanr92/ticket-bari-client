import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";

const AddTicket = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [data, setData] = useState();

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`https://go-ticket-server.vercel.app/users-coll?email=${user.email}`)
            .then((response) => {
                const userData = response.data[0];
                setData(userData);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [user?.email]);

    const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;

    const onSubmit = async (formData) => {
        try {
            // 1️⃣ Upload image
            const imageFile = formData.image[0];
            const imgFormData = new FormData();
            imgFormData.append("image", imageFile);

            const imgRes = await fetch(
                `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
                {
                    method: "POST",
                    body: imgFormData,
                }
            );

            const imgData = await imgRes.json();

            if (!imgData.success) {
                console.error("Image upload failed");
                return;
            }

            
            const ticketData = {
                title: formData.title,
                fromLocation: formData.from,
                toLocation: formData.to,
                transportType: formData.transport,
                pricePerUnit: Number(formData.price),
                ticketQuantity: Number(formData.quantity),

                // ✅ separate date & time
                departureDate: formData.departureDate,
                departureTime: formData.departureTime,

                perks: formData.perks || [],
                image: imgData.data.url,

                vendorName: user.displayName,
                vendorEmail: user.email,

                verificationStatus: "pending",
                createdAt: new Date(),
            };

            console.log("Ticket Data:", ticketData);

            axios.post('https://go-ticket-server.vercel.app/ticket-coll', ticketData)
                .then(res => {
                    console.log("User saved to DB:", res.data);
                    alert('Account Created Successfully');
                })
                .catch(dbError => {
                    console.error("DB save error:", dbError);
                    alert("Account created, but database save failed");
                });

            // reset();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <h4>Loading....</h4>;
    }

    return (
        <>
            {data?.role !== "vendor" ? (
                <div className="min-h-screen flex items-center justify-center">
                    <h2>Sorry You Are Not Allowed To This Page!</h2>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaTicketAlt /> Add New Ticket
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        <input
                            {...register("title", { required: true })}
                            placeholder="Ticket Title"
                            className="input input-bordered w-full"
                        />

                        <select
                            {...register("transport", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Transport</option>
                            <option value="Bus">🚌 Bus</option>
                            <option value="Train">🚆 Train</option>
                            <option value="Plane">✈️ Plane</option>
                        </select>

                        <input
                            {...register("from", { required: true })}
                            placeholder="From Location"
                            className="input input-bordered w-full"
                        />

                        <input
                            {...register("to", { required: true })}
                            placeholder="To Location"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="number"
                            {...register("price", { required: true })}
                            placeholder="Price per unit"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="number"
                            {...register("quantity", { required: true })}
                            placeholder="Ticket Quantity"
                            className="input input-bordered w-full"
                        />

                        {/* ✅ Departure Date */}
                        <input
                            type="date"
                            {...register("departureDate", { required: true })}
                            className="input input-bordered w-full"
                        />

                        {/* ✅ Departure Time */}
                        <input
                            type="time"
                            {...register("departureTime", { required: true })}
                            className="input input-bordered w-full"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: true })}
                            className="file-input file-input-bordered w-full"
                        />

                        <input
                            value={user.displayName}
                            readOnly
                            className="input input-bordered w-full bg-base-200"
                        />

                        <input
                            value={user.email}
                            readOnly
                            className="input input-bordered w-full bg-base-200"
                        />

                        <div className="md:col-span-2">
                            <label className="font-semibold">Perks</label>
                            <div className="flex gap-4 mt-2 flex-wrap">
                                {["AC", "Breakfast", "WiFi", "Charging"].map((perk) => (
                                    <label key={perk} className="label cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            value={perk}
                                            {...register("perks")}
                                            className="checkbox"
                                        />
                                        <span>{perk}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 mt-4 btn text-white border-none"
                            style={{ backgroundColor: "#e9553f" }}
                        >
                            Add Ticket
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddTicket;
