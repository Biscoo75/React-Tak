import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/layOut/layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cards from './components/movieCards';
import AllUsers from './components/allUsers';
import NotFound from './components/Not Found/notFound';
import ProductDetails from './components/productDetails';
// import Web from './components/web/web';

let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Cards /> },
      {
        path: 'Users', element: <AllUsers />, children: [
          // { path: 'mobile', element: <Mobile /> },
          // { path: 'web', element: <Web/> },
        ]
      },
      // { path: 'productDetails', element: <ProductDetails /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: '*', element: <NotFound /> },



    ]
  },
])

export default function App() {
  return (
    <RouterProvider router={routers}>

    </RouterProvider>
  );
}

