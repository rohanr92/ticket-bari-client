// import { NavLink } from "react-router-dom";

import { NavLink } from "react-router";
import logo from '../../../assets/logo-black.svg';
import { FaUserCog } from "react-icons/fa";
import { LuTicketsPlane } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-full bg-base-200 p-4">
            <img src={logo} alt="" srcset="" className="mb-4" />

            <ul className="menu space-y-2 w-full p-0">
                <li>
                    <NavLink to="/dashboard/profile">
                        <FaUserCog className="text-[25px]" /> <h4 className="text-[16px]">Profile</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/booked-tickets">
                        <LuTicketsPlane className="text-[25px]" /> <h4 className="text-[16px]">My Booked Tickets</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/transaction-history">
                        <AiOutlineTransaction className="text-[25px]" /> <h4 className="text-[16px]">Transaction History</h4>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
