import React from 'react';
import { useNavigate } from 'react-router';

const PaymentCancel = () => {
    let navigate = useNavigate();

  const  handlePrevious = () => {
        navigate('/dashboard/added-tickets')
    }
    return (
        <div>
            <button onClick={handlePrevious}>Back To The Added Tickets</button>
            
        </div>
    );
};

export default PaymentCancel;