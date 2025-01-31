import React from 'react';
import Navbar from './compontents/Navbar';
import Footer from './compontents/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Favorite from './pages/Favorite.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import DetailCard from './pages/DetailCard.jsx';
import DetailGenre from './pages/DetailGenre.jsx';
import DetailAdmin from './pages/DetailAdmin.jsx';
import Profile from './pages/Profile.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import AdminTheLoai from './pages/AdminTheLoai.jsx';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen"> {/* Flex container */}
        <Router>
          <Navbar />
          <main className="flex-grow"> {/* Main content area */}
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Favorite />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/the-loai" element={<AdminTheLoai />} />
              <Route path='/admin/manga/:id' element={<DetailAdmin />} />
              <Route path='/manga/:id' element={<DetailCard />} />
              <Route path='/genre/:genreId' element={<DetailGenre />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;