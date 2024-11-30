import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mainpage from './component/mainpage/Mainpage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Configure the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainpage />,
  },
]);

// Render the root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Report web vitals (optional, can be ignored if unused)
reportWebVitals(console.log); // Replace `console.log` with your analytics function if needed
