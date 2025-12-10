import React from 'react';
import Container from '../../../Container/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  FaShip,
  FaBus,
  FaCar,
  FaCheckCircle,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";
import SkeletonCard from "../Sponsored/Skeleton";
import { useQuery } from '@tanstack/react-query';

const Latest = () => {

  const { data: sponsored = [], isLoading } = useQuery({
    queryKey: ["sponsored"],
    queryFn: () => fetch("/sponsored.json").then((res) => res.json()),
  });

  function CustomTabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case "ship":
        return <FaShip />;
      case "bus":
        return <FaBus />;
      case "car":
        return <FaCar />;
      default:
        return <FaCar />;
    }
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 10) + 1;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="my-[60px]">
        <Container>
          <div className="text-center mb-[28px]">
            <h2 className="md:text-[40px] font-[700] text-[30px]">Latest Tickets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='my-[60px]'>
      <Container>

        <div className=" text-center mb-[28px]">
          <h2 className="md:text-[40px] font-[700] text-[30px]">
            Latest Tickets
          </h2>
        </div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} className='active:text-black' >
              <Tab label="Bus" {...a11yProps(0)} />
              <Tab label="Train" {...a11yProps(1)} />
              <Tab label="Air" {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/* TAB 1 */}
          <CustomTabPanel value={value} index={0}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sponsored.slice(0, 6).map((item, index) => (

                <div key={index} className="rounded-xl border border-gray-200 hover:shadow-lg transition p-4">

                  <img
                    src={item.image}
                    alt={item.ticketTitle}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-xl font-semibold mt-3">{item.ticketTitle}</h3>

                  <div className="mt-2 font-medium text-gray-700 text-sm">
                    {item.route}
                  </div>

                  <div className="flex flex-col items-center mt-2 mb-2">
                    <p className="text-gray-600 text-sm">{generateRandomTime()}</p>

                    <div className="flex items-center w-full justify-center mt-1">
                      <div className="bg-[#e95440] text-white p-2 rounded-full flex items-center justify-center">
                        {getTransportIcon(item.transportType)}
                      </div>

                      <div className="flex-1 h-[4px] bg-[#e95440] mx-2 rounded"></div>

                      <div className="w-3 h-3 bg-[#e95440] rounded-full"></div>
                    </div>
                  </div>

                  <div className="divider my-1"></div>

                  <p className="text-gray-700 mt-1">
                    <span className="font-bold text-[#e95440]">${item.pricePerUnit}</span> / per unit
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaTicketAlt className="text-[#e95440]" />
                    <span>Available: {item.ticketQuantity}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
                    <span className="text-[#e95440]">{getTransportIcon(item.transportType)}</span>
                    <span className="capitalize">{item.transportType}</span>
                  </div>

                  <div className="mt-3">
                    {item.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaCheckCircle className="text-green-500" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button className="cursor-pointer mt-4 w-full bg-[#e95440] text-white py-2 rounded-[5px] flex justify-center items-center gap-2 hover:bg-[#cf4c39] transition">
                    See Details <FaArrowRight />
                  </button>
                </div>

              ))}
            </div>
          </CustomTabPanel>

          {/* TAB 2 */}
          <CustomTabPanel value={value} index={1}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sponsored.slice(0, 6).map((item, index) => (

                <div key={index} className="rounded-xl border border-gray-200 hover:shadow-lg transition p-4">

                  <img
                    src={item.image}
                    alt={item.ticketTitle}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-xl font-semibold mt-3">{item.ticketTitle}</h3>

                  <div className="mt-2 font-medium text-gray-700 text-sm">
                    {item.route}
                  </div>

                  <div className="flex flex-col items-center mt-2 mb-2">
                    <p className="text-gray-600 text-sm">{generateRandomTime()}</p>

                    <div className="flex items-center w-full justify-center mt-1">
                      <div className="bg-[#e95440] text-white p-2 rounded-full flex items-center justify-center">
                        {getTransportIcon(item.transportType)}
                      </div>

                      <div className="flex-1 h-[4px] bg-[#e95440] mx-2 rounded"></div>

                      <div className="w-3 h-3 bg-[#e95440] rounded-full"></div>
                    </div>
                  </div>

                  <div className="divider my-1"></div>

                  <p className="text-gray-700 mt-1">
                    <span className="font-bold text-[#e95440]">${item.pricePerUnit}</span> / per unit
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaTicketAlt className="text-[#e95440]" />
                    <span>Available: {item.ticketQuantity}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
                    <span className="text-[#e95440]">{getTransportIcon(item.transportType)}</span>
                    <span className="capitalize">{item.transportType}</span>
                  </div>

                  <div className="mt-3">
                    {item.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaCheckCircle className="text-green-500" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button className="cursor-pointer mt-4 w-full bg-[#e95440] text-white py-2 rounded-[5px] flex justify-center items-center gap-2 hover:bg-[#cf4c39] transition">
                    See Details <FaArrowRight />
                  </button>
                </div>

              ))}
            </div>
          </CustomTabPanel>

          {/* TAB 3 */}
          <CustomTabPanel value={value} index={2}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sponsored.slice(0, 6).map((item, index) => (

                <div key={index} className="rounded-xl border border-gray-200 hover:shadow-lg transition p-4">

                  <img
                    src={item.image}
                    alt={item.ticketTitle}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-xl font-semibold mt-3">{item.ticketTitle}</h3>

                  <div className="mt-2 font-medium text-gray-700 text-sm">
                    {item.route}
                  </div>

                  <div className="flex flex-col items-center mt-2 mb-2">
                    <p className="text-gray-600 text-sm">{generateRandomTime()}</p>

                    <div className="flex items-center w-full justify-center mt-1">
                      <div className="bg-[#e95440] text-white p-2 rounded-full flex items-center justify-center">
                        {getTransportIcon(item.transportType)}
                      </div>

                      <div className="flex-1 h-[4px] bg-[#e95440] mx-2 rounded"></div>

                      <div className="w-3 h-3 bg-[#e95440] rounded-full"></div>
                    </div>
                  </div>

                  <div className="divider my-1"></div>

                  <p className="text-gray-700 mt-1">
                    <span className="font-bold text-[#e95440]">${item.pricePerUnit}</span> / per unit
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaTicketAlt className="text-[#e95440]" />
                    <span>Available: {item.ticketQuantity}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 font-medium text-gray-700">
                    <span className="text-[#e95440]">{getTransportIcon(item.transportType)}</span>
                    <span className="capitalize">{item.transportType}</span>
                  </div>

                  <div className="mt-3">
                    {item.perks.slice(0, 3).map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <FaCheckCircle className="text-green-500" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button className="cursor-pointer mt-4 w-full bg-[#e95440] text-white py-2 rounded-[5px] flex justify-center items-center gap-2 hover:bg-[#cf4c39] transition">
                    See Details <FaArrowRight />
                  </button>
                </div>

              ))}
            </div>
          </CustomTabPanel>

        </Box>

      </Container>
    </div>
  );
};

export default Latest;
