import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);

    useEffect(() => {
        if(sessionId){
            axios.patch(`http://localhost:3000/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                
            })
        }
    }, [sessionId])
    
    return (

          

        <div>
            <h2>Your payment got success</h2>
        </div>
    );
};

export default PaymentSuccess;