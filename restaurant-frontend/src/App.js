import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Contact from './components/Contact';
import BookTable from './pages/BookTable';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from "./Context/AuthContext"; 
import TableBookingList from './Data/TableBookingList';
import EditBooking from "./pages/EditBooking";

const App = () => {
    return (
        <AuthProvider>
      <Router>
        <Header />
        
        <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/book-table" element={<BookTable />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/my-bookings" element={<TableBookingList />} />
                <Route path="/edit-booking/:id" element={<EditBooking />} />
        </Routes>
      </Router>

    </AuthProvider>
    );
};

export default App;
