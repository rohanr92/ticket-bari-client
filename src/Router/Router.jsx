import React from 'react';
import { createBrowserRouter } from 'react-router';

import Home from '../Components/AllPages/HomePage/Home';
import Root from '../layout/Root';
import AuthLayout from '../layout/AuthLayout';
import Login from '../Components/LogSysytem/Login/Login';
import SignUp from '../Components/LogSysytem/SignUp/SignUp';
import ForgotPassword from '../Components/LogSysytem/ForgotPass/ForgotPassword';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
   {
    path: '/auth/sign-in',
    element: <Login></Login>
   },
   {

    path: '/auth/sign-up',
    element: <SignUp></SignUp>
   },
   {
    path: '/auth/forgot-pass',
    Component: ForgotPassword
   },
    ]
  }
]);

export default router;