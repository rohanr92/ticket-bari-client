import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "react-router";

const VendorTicketUpdate = () => {
  const ticket = useLoaderData();
  const { id } = useParams();

  const {
    title,
    fromLocation,
    toLocation,
    transportType,
    pricePerUnit,
    ticketQuantity,
    departureDate,
    departureTime,
    perks = [],
    image,
    vendorName,
    vendorEmail,
  } = ticket || {};

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedTicket = {
      title: form.title.value,
      transportType: form.transportType.value,
      fromLocation: form.fromLocation.value,
      toLocation: form.toLocation.value,
      pricePerUnit: Number(form.pricePerUnit.value),
      ticketQuantity: Number(form.ticketQuantity.value),
      departureDate: form.departureDate.value,
      departureTime: form.departureTime.value,
      image: form.image.value,
      perks: Array.from(form.perks)
        .filter((p) => p.checked)
        .map((p) => p.value),
    };

    console.log("Updated Ticket:", updatedTicket);

    // 🔴 PATCH later
    // fetch(`https://go-ticket-server.vercel.app/ticket-coll/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedTicket),
    // });

   axios.patch(`https://go-ticket-server.vercel.app/ticket-coll/${id}`, updatedTicket)
  .then(res => {
    console.log(res.data);
    alert("Successfully Updated");
  })
  .catch(err => {
    console.error(err);
    alert("Update Failed");
  });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#e9553f]">
        Update Ticket
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Ticket Title */}
        <input
          name="title"
          defaultValue={title}
          className="input input-bordered w-full"
          placeholder="Ticket Title"
        />

        {/* Transport */}
        <select
          name="transportType"
          defaultValue={transportType}
          className="select select-bordered w-full"
        >
          <option value="">Select Transport</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Launch">Launch</option>
        </select>

        {/* From */}
        <input
          name="fromLocation"
          defaultValue={fromLocation}
          className="input input-bordered w-full"
          placeholder="From Location"
        />

        {/* To */}
        <input
          name="toLocation"
          defaultValue={toLocation}
          className="input input-bordered w-full"
          placeholder="To Location"
        />

        {/* Price */}
        <input
          name="pricePerUnit"
          type="number"
          defaultValue={pricePerUnit}
          className="input input-bordered w-full"
          placeholder="Price per unit"
        />

        {/* Quantity */}
        <input
          name="ticketQuantity"
          type="number"
          defaultValue={ticketQuantity}
          className="input input-bordered w-full"
          placeholder="Ticket Quantity"
        />

        {/* Date */}
        <input
          name="departureDate"
          type="date"
          defaultValue={departureDate}
          className="input input-bordered w-full"
        />

        {/* Time */}
        <input
          name="departureTime"
          type="time"
          defaultValue={departureTime}
          className="input input-bordered w-full"
        />

        {/* Image URL */}
        <input
          name="image"
          defaultValue={image}
          className="input input-bordered w-full md:col-span-2"
          placeholder="Image URL"
        />

        {/* Vendor Name */}
        <input
          defaultValue={vendorName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        {/* Vendor Email (readonly) */}
        <input
          defaultValue={vendorEmail}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        {/* Perks */}
        <div className="md:col-span-2">
          <p className="font-semibold mb-2">Perks</p>
          <div className="flex gap-6">
            {["AC", "Breakfast", "WiFi", "Charging"].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="perks"
                  value={perk}
                  defaultChecked={perks.includes(perk)}
                  className="checkbox"
                />
                {perk}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#e9553f] hover:bg-[#d84a36] text-white py-3 rounded-lg font-semibold"
          >
            Update Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorTicketUpdate;
