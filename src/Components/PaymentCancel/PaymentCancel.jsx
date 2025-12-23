import React from 'react';
import { useNavigate } from 'react-router';

const PaymentCancel = () => {
    let navigate = useNavigate();

  const  handlePrevious = () => {
        navigate('/dashboard/booked-tickets')
    }
    return (
        <div>
            <button onClick={handlePrevious}>Back To The Booked Tickets</button>
            
        </div>
    );
};

export default PaymentCancel;