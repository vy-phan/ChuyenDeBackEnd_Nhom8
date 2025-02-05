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
import { useAuthContext } from './context/auth.context.jsx';

function App() {
  const authContext = useAuthContext();

  return (
    <>
      <div className="flex flex-col min-h-screen"> {/* Flex container */}
        <Router>
          <Navbar />
          <main className="flex-grow"> {/* Main content area */}
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={authContext ? <Favorite /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/profile" element={authContext ? <Profile /> : <Login />} />
              <Route path="/admin" element={authContext ? <Admin /> : <Login />} />
              <Route path="/admin/the-loai" element={authContext ? <AdminTheLoai /> : <Login />} />
              <Route path='/admin/manga/:id' element={authContext ? <DetailAdmin /> : <Login />} />
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