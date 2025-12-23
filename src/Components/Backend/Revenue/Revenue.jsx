import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Revenue = () => {
  const { user } = useContext(AuthContext);


  const { data: revenue = {}, isLoading } = useQuery({
    queryKey: ['vendorRevenue', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/vendor-revenue?email=${user.email}`
      );
      return res.json();
    }
  });


  const { data: tickets = [] } = useQuery({
    queryKey: ['vendorTickets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/user-ticket-coll?email=${user.email}`
      );
      return res.json();
    }
  });


  const { data: soldTickets = [] } = useQuery({
    queryKey: ['vendorSold', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/booking-ticket-pending?email=${user.email}`
      );
      return res.json();
    }
  });

  if (isLoading) return <p>Loading revenue...</p>;


  const overviewData = [
    { name: 'Revenue', value: revenue.totalRevenue || 0 },
    { name: 'Tickets Sold', value: revenue.totalOrders || 0 },
    { name: 'Tickets Added', value: tickets.length }
  ];

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Revenue Overview</h2>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold">৳ {revenue.totalRevenue || 0}</h3>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Tickets Sold</p>
          <h3 className="text-2xl font-bold">
            {revenue.totalOrders || 0}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Tickets Added</p>
          <h3 className="text-2xl font-bold">
            {tickets.length}
          </h3>
        </div>
      </div>

      {/* ================== BAR CHART ================== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Business Summary</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Revenue;
