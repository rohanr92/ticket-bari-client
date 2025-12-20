import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const AddTicket = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  
  const vendorName = "Demo Vendor";
  const vendorEmail = "vendor@email.com";

  const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;

  const onSubmit = async (data) => {
    try {
     
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(user);
      

      const imgData = await imgRes.json();

      if (!imgData.success) {
        console.error("Image upload failed");
        return;
      }

      // 2️⃣ Combine date & time
      const departure = `${data.departureDate}T${data.departureTime}`;

      // 3️⃣ Final ticket object
      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departure,
        perks: data.perks || [],
        image: imgData.data.url,
        vendorName,
        vendorEmail,
      };

      console.log("Ticket Data:", ticketData);

      // 👉 POST to backend here

      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaTicketAlt /> Add New Ticket
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Ticket Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Ticket Title"
          className="input input-bordered w-full"
        />

        {/* Transport Type */}
        <select
          {...register("transport", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Transport</option>
          <option value="Bus">🚌 Bus</option>
          <option value="Train">🚆 Train</option>
          <option value="Plane">✈️ Plane</option>
        </select>

        {/* From */}
        <input
          {...register("from", { required: true })}
          placeholder="From Location"
          className="input input-bordered w-full"
        />

        {/* To */}
        <input
          {...register("to", { required: true })}
          placeholder="To Location"
          className="input input-bordered w-full"
        />

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price per unit"
          className="input input-bordered w-full"
        />

        {/* Quantity */}
        <input
          type="number"
          {...register("quantity", { required: true })}
          placeholder="Ticket Quantity"
          className="input input-bordered w-full"
        />

        {/* Departure Date */}
        <input
          type="date"
          {...register("departureDate", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Departure Time */}
        <input
          type="time"
          {...register("departureTime", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="file-input file-input-bordered w-full"
        />

        {/* Vendor Name */}
        <input
          value={user.displayName}
          readOnly
          className="input input-bordered w-full bg-base-200"
        />

        {/* Vendor Email */}
        <input
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-base-200"
        />

        {/* Perks */}
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
                  style={{ accentColor: "#e9553f" }}
                />
                <span>{perk}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 mt-4 btn text-white border-none"
          style={{ backgroundColor: "#e9553f" }}
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
