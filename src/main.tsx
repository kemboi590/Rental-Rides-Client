// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/landingPage/Home.tsx';
import Register from './pages/register/Register.tsx';
import Login from './pages/login/Login.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';

// redux and redux-persist
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './app/store.ts';
import Vehicles from './pages/dashboard/main/Vehicles.tsx';
import AllBookings from './pages/dashboard/main/AllBookings.tsx';
import SupportTickets from './pages/dashboard/main/SupportTickets.tsx';
import Account from './pages/dashboard/main/Account.tsx';
import CreateVehicle from './pages/dashboard/main/CreateVehicle.tsx';
import BookingForm from './pages/dashboard/main/BookingForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'create-vehicle',
        element: <CreateVehicle />
      },
      {
        path: 'more-vehicles',
        element: <Vehicles />
      },
      {
        path: 'more-vehicles/booking/:vehicle_id',
        element: <BookingForm />
      },
      {
        path: 'allbookings',
        element: <AllBookings />
      },
      {
        path: 'support-tickets',
        element: <SupportTickets />
      },
      {
        path: 'account',
        element: <Account />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
