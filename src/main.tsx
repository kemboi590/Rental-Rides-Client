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
import CreateVehicle from './pages/dashboard/main/CreateVehicleSpecs.tsx';
import BookingForm from './pages/dashboard/main/BookingForm.tsx';
import Profile from './pages/dashboard/main/Profile.tsx';
import UserBookings from './pages/dashboard/main/Payments';
import SuccessPayment from './pages/dashboard/Success.Payment.tsx';
import PaymentFailed from './pages/dashboard/PaymentFailed.tsx';
import Error from './pages/Error.tsx';
import MyBookings from './pages/dashboard/main/MyBookings';

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

  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: 'create-vehicle',
        element: <CreateVehicle />
      },
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
        element: <MyBookings />,
        errorElement: <Error />
      },
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
