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
import AllBookings from './pages/dashboard/main/Bookings/AllBookings.tsx';
import SupportTickets from './pages/dashboard/main/Tickets/SupportTickets.tsx';
import Account from './pages/dashboard/main/Account.tsx';
import BookingForm from './pages/dashboard/main/Bookings/BookingForm.tsx';
import Profile from './pages/dashboard/main/Profile.tsx';
import UserBookings from './pages/dashboard/main/Payments/Payments.tsx';
import SuccessPayment from './pages/dashboard/main/Payments/Success.Payment.tsx';
import PaymentFailed from './pages/dashboard/main/Payments/PaymentFailed.tsx';
import Error from './pages/Error.tsx';
import MyBookings from './pages/dashboard/main/Bookings/MyBookings.tsx';
import MyTickets from './pages/dashboard/main/Tickets/MyTickets.tsx';
import ManageVehicle from './pages/dashboard/main/ManageVehicles/ManageVehicle.tsx';
import Reports from './pages/dashboard/main/Reports/Reports.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />
  },
  // DASHBOARD ROUTES
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: 'vehicles',
        element: <Vehicles />
      },
      {
        path: 'vehicles/booking/:vehicle_id',
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
      },
      {
        path: 'payments',
        element: <UserBookings />
      },
      {
        path: 'payment-successful',
        element: <SuccessPayment />
      },
      {
        path: 'payment-failed',
        element: <PaymentFailed />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'mybookings',
        element: <MyBookings />
      },
      {
        path: 'my-tickets',
        element: <MyTickets />
      },
      {
        path: 'manage-vehicles',
        element: <ManageVehicle />
      },
      {
        path: 'report',
        element: <Reports />
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
