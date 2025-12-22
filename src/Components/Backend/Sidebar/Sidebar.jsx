import { NavLink } from "react-router";
import logo from '../../../assets/download.svg';

import { FaUserCog } from "react-icons/fa";
import { LuTicketsPlane } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdFileDownloadDone } from "react-icons/md";
import { ImUserCheck } from "react-icons/im";
import { RiExchangeDollarLine } from "react-icons/ri";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";
import { GiOverdose } from "react-icons/gi";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://go-ticket-server.vercel.app/users-coll?email=${user.email}`)
      .then(res => {
        setData(res.data[0]);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
      });
  }, [user?.email]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg transition-all
     ${
       isActive
         ? "bg-[#e9553f] text-black font-semibold"
         : "text-gray-300 hover:bg-[#1E293B] hover:text-white"
     }`;

     console.log(data?.role);
     

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#0F172A] to-[#020617] px-4 py-6 flex flex-col">
      
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2 px-2">
        <div className="bg-[#e9553f] text-black font-bold w-9 h-9 rounded-lg flex items-center justify-center">
          L
        </div>
        <div>
          <img src={logo} alt="" srcset="" className="text-white" />
          <p className="text-xs text-gray-400 tracking-wide">
            BACKEND PORTAL
          </p>
        </div>
      </div>

      {/* Menu */}
      <ul className="space-y-2 flex-1">

        <NavLink to="/dashboard/overview" end className={linkClass}>
  <GiOverdose className="text-xl" />
  <span className="text-sm">Overview</span>
</NavLink>
{
    data?.role === 'admin' ? (


        <>

        <NavLink to="/dashboard/manage-tickets" end className={linkClass}>
  <GiOverdose className="text-xl" />
  <span className="text-sm">Manage Tickets</span>
</NavLink>
        <NavLink to="/dashboard/manage-users" end className={linkClass}>
  <GiOverdose className="text-xl" />
  <span className="text-sm">Manage Users</span>
</NavLink>


        </>


    ) : (
        <>
        
          {data?.role !== "vendor" ? (
          <>
          

            <li>
              <NavLink to="/dashboard/profile" className={linkClass}>
                <FaUserCog className="text-xl" />
                <span className="text-sm">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/booked-tickets" className={linkClass}>
                <LuTicketsPlane className="text-xl" />
                <span className="text-sm">My Booked Tickets</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/transaction-history" className={linkClass}>
                <AiOutlineTransaction className="text-xl" />
                <span className="text-sm">Transaction History</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
        

            <li>
              <NavLink to="/dashboard/profile" className={linkClass}>
                <FaUserCog className="text-xl" />
                <span className="text-sm">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/add-ticket" className={linkClass}>
                <IoAddCircleSharp className="text-xl" />
                <span className="text-sm">Add Tickets</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/added-tickets" className={linkClass}>
                <MdFileDownloadDone className="text-xl" />
                <span className="text-sm">My Added Tickets</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/requested-bookings" className={linkClass}>
                <ImUserCheck className="text-xl" />
                <span className="text-sm">Requested Bookings</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/revenue" className={linkClass}>
                <RiExchangeDollarLine className="text-xl" />
                <span className="text-sm">Revenue Overview</span>
              </NavLink>
            </li>
          </>
        )}
        
        
        </>
    )
}



       
      
      </ul>

      {/* Logout */}
      <button className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition">
        <span className="text-xl">⎋</span>
        <span className="text-sm">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
