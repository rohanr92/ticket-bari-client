import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';

const Transaction = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/payments?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPayments(data.payments);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (authLoading || loading) return <p className="text-center mt-10">Loading transactions...</p>;
  if (!payments.length) return <p className="text-center mt-10 text-gray-500">No transactions found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Transactions</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Ticket Name</th>
              <th>Amount (৳)</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.ticketName}</td>
                <td>{payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td className={payment.paymentStatus === 'paid' ? 'text-green-500 font-bold' : 'text-red-500'}>
                  {payment.paymentStatus}
                </td>
                <td>{payment.paymentGateway.join(', ')}</td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
