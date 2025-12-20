import React from 'react';
import { createBrowserRouter } from 'react-router';

import Home from '../Components/AllPages/HomePage/Home';
import Root from '../layout/Root';
import AuthLayout from '../layout/AuthLayout';
import Login from '../Components/LogSysytem/Login/Login';
import SignUp from '../Components/LogSysytem/SignUp/SignUp';
import ForgotPassword from '../Components/LogSysytem/ForgotPass/ForgotPassword';
import VendorSign from '../Components/LogSysytem/VendorLogin/VendorSign';
import DashLayout from '../layout/DashLayout';
import Profile from '../Components/Backend/Profile/Profile';
import BookedTickets from '../Components/Backend/BookedTickets/BookedTickets';
import Transaction from '../Components/Backend/Transaction History/Transaction';
import AddTicket from '../Components/Backend/AddTicket/AddTicket';
import AddedTickets from '../Components/Backend/AddedTickets/AddedTickets';
import RequestedBooking from '../Components/Backend/RequestedBookings/RequestedBooking';
import Revenue from '../Components/Backend/Revenue/Revenue';

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
    path: 'sign-in',
    element: <Login></Login>
   },
   {

    path: 'sign-up',
    element: <SignUp></SignUp>
   },
   {
    path: 'forgot-pass',
    Component: ForgotPassword
   },
   {
    path: 'be-a-vendor',
    element: <VendorSign></VendorSign>,
   }
    ]
  },
    {
    path: '/dashboard',
    Component: DashLayout,
    children: [
   {
    path: 'profile',
    element: <Profile></Profile>,
   },
   {
    path: 'booked-tickets',
    element: <BookedTickets></BookedTickets>,
   },
   {
    path: 'transaction-history',
    element: <Transaction></Transaction>,
   },
   {
    path: 'add-ticket',
    element: <AddTicket></AddTicket>
   },
   {
    path: 'added-tickets',
    element: <AddedTickets></AddedTickets>
   },
   {
    path: 'requested-bookings',
    element: <RequestedBooking></RequestedBooking>
   },
   {
    path: 'revenue',
    element: <Revenue></Revenue>
   }
    ]
  }
]);

export default router;