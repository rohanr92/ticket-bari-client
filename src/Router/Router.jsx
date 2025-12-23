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
import AllTickets from '../Components/AllPages/AllTickets/AllTickets';
import TicketDetails from '../Components/AllPages/TicketDetails/TicketDetails';
import VendorTicketUpdate from '../Components/AllPages/VendorTicketUpdate/VendorTicketUpdate';
import Overview from '../Components/Backend/Overview/Overview';
import ManageTickets from '../Components/Backend/ManageTickets/manageTickets';
import ManageUsers from '../Components/Backend/ManageUsers/manageUsers';
import AboutUs from '../Components/AllPages/AboutUs/AboutUs';
import ContactUs from '../Components/AllPages/Contact/ContactUs';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';
import PaymentSuccess from '../Components/Backend/PaymentSuccess/PaymentSuccess';
import PaymentCancel from '../Components/PaymentCancel/PaymentCancel';
import AdvertiseTickets from '../Components/Backend/ AdvertiseTickets  / AdvertiseTickets ';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
      path: 'all-tickets', 
      loader: () => fetch('http://localhost:3000/ticket-coll'),
      element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute>
    },
    {
      path: 'all-tickets/:id',
       loader: ({ params }) => fetch(`http://localhost:3000/ticket-coll/${params.id}`),
       element: <PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>
    },
    {
      path: 'about-us',
      Component: AboutUs
    },
    {
      path: 'contact-us',
      Component: ContactUs
    }
   
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
    element: <PrivateRoute><DashLayout></DashLayout></PrivateRoute>,
    children: [
   {
    path: 'profile',
    element: <PrivateRoute><Profile></Profile></PrivateRoute>,
   },
   {

    path: 'overview',
    element: <PrivateRoute><Overview></Overview></PrivateRoute>
   },
     {

    path: 'manage-Tickets',
    element: <PrivateRoute><ManageTickets></ManageTickets></PrivateRoute>
   },
   {
    path: 'manage-users',
    element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
   },
   {
    path: 'booked-tickets',
    element: <PrivateRoute><BookedTickets></BookedTickets></PrivateRoute>,
   },
   {
    path: 'transaction-history',
    element: <PrivateRoute><Transaction></Transaction></PrivateRoute>,
   },
   {
    path: 'add-ticket',
    element: <PrivateRoute><AddTicket></AddTicket></PrivateRoute>
   },
   {
    path: 'update-tickets/:id',
    loader: ({ params }) => fetch(`http://localhost:3000/ticket-coll/${params.id}`),
    element: <PrivateRoute><VendorTicketUpdate></VendorTicketUpdate></PrivateRoute>

   },
   {
    path: 'added-tickets',
    element:  <PrivateRoute><AddedTickets></AddedTickets></PrivateRoute>
   },
   {
    path: 'requested-bookings',
    element: <PrivateRoute><RequestedBooking></RequestedBooking></PrivateRoute>
   },
   {
    path: 'revenue',
    element: <PrivateRoute><Revenue></Revenue></PrivateRoute>
   },
   {
    path: 'payment-success',
    element: <PaymentSuccess></PaymentSuccess>
   },
   {
    path: 'payment-cancel',
    element: <PaymentCancel></PaymentCancel>
   },
   {
   path: 'advertise-products',
   element: <PrivateRoute><AdvertiseTickets></AdvertiseTickets></PrivateRoute>
  }
   
    ]
  }
]);

export default router;