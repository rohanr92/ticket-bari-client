import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';



const PrivateRoute = ({children}) => {

    const location = useLocation();
    console.log(location);
    

    const { user, loading } = use(AuthContext);


 if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl text-green-300"></span>
      </div>
    );
  }



    if(user) {
        return children;
    } 
return <Navigate  state={location.pathname} to='/auth/sign-in'></Navigate>
    
    
};

export default PrivateRoute;