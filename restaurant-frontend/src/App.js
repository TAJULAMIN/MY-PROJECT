import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Contact from './components/Contact';
import BookTable from './pages/BookTable';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/book-table" element={<BookTable />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;
