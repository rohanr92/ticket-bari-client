import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Root';
import Home from '../Components/AllPages/HomePage/Home';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
    ],
  },
]);

export default router;