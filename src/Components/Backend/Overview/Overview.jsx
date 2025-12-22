import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

import { FaUserCog } from "react-icons/fa";
import { LuTicketsPlane } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdFileDownloadDone } from "react-icons/md";
import { ImUserCheck } from "react-icons/im";
import { RiExchangeDollarLine } from "react-icons/ri";
import { GiOverdose } from "react-icons/gi";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/users-coll?email=${user.email}`)
      .then(res => setData(res.data[0]))
      .catch(err => console.error(err));
  }, [user?.email]);

  const role = data?.role;

  /* ---------- CARDS BASED ON ROLE ---------- */

  let cards = [];

  // ADMIN
  if (role === "admin") {
    cards = [
      {
        title: "Overview",
        desc: "System overview and quick access.",
        icon: <GiOverdose />,
        link: "/dashboard/overview",
      },
      {
        title: "Manage Tickets",
        desc: "View, update and control all tickets.",
        icon: <MdFileDownloadDone />,
        link: "/dashboard/manage-tickets",
      },
      {
        title: "Manage Users",
        desc: "Control user accounts and roles.",
        icon: <ImUserCheck />,
        link: "/dashboard/manage-users",
      },
    ];
  }

  // NORMAL USER
  else if (role !== "vendor") {
    cards = [
      {
        title: "Overview",
        desc: "Your activity summary and updates.",
        icon: <GiOverdose />,
        link: "/dashboard/overview",
      },
      {
        title: "My Profile",
        desc: "Update your personal information.",
        icon: <FaUserCog />,
        link: "/dashboard/profile",
      },
      {
        title: "My Booked Tickets",
        desc: "View all your booked tickets.",
        icon: <LuTicketsPlane />,
        link: "/dashboard/booked-tickets",
      },
      {
        title: "Transaction History",
        desc: "View payment and transaction records.",
        icon: <AiOutlineTransaction />,
        link: "/dashboard/transaction-history",
      },
    ];
  }

  // VENDOR
  else {
    cards = [
      {
        title: "Overview",
        desc: "Vendor dashboard overview.",
        icon: <GiOverdose />,
        link: "/dashboard/overview",
      },
      {
        title: "My Profile",
        desc: "Manage your vendor profile.",
        icon: <FaUserCog />,
        link: "/dashboard/profile",
      },
      {
        title: "Add Tickets",
        desc: "Create and publish new tickets.",
        icon: <IoAddCircleSharp />,
        link: "/dashboard/add-ticket",
      },
      {
        title: "My Added Tickets",
        desc: "Manage tickets you have added.",
        icon: <MdFileDownloadDone />,
        link: "/dashboard/added-tickets",
      },
      {
        title: "Requested Bookings",
        desc: "Approve or reject booking requests.",
        icon: <ImUserCheck />,
        link: "/dashboard/requested-bookings",
      },
      {
        title: "Revenue Overview",
        desc: "Track your earnings and revenue.",
        icon: <RiExchangeDollarLine />,
        link: "/dashboard/revenue",
      },
    ];
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#020617] text-white rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">
          Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-300 mt-1">
          Here is your daily overview.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <NavLink
            key={index}
            to={card.link}
            className="bg-white border border-gray-300 rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="text-3xl text-[#e9553f]">
              {card.icon}
            </div>
            <h3 className="mt-4 font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {card.desc}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Overview;
