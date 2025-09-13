import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Backdrops from './pages/Backdrops';
import Photobooth360 from './pages/Photobooth360';
import MobilePhotobooth from './pages/MobilePhotobooth';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';
import BookNow from './pages/BookNow';
import Speakers from './pages/Speakers';
import Stanchions from './pages/Stanchions';
import PowerStation from './pages/PowerStation';
import Props from './pages/Props';
import Lighting from './pages/Lighting';
import BookingForm from './pages/BookingForm';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backdrops" element={<Backdrops />} />
            <Route path="/360-videobooth" element={<Photobooth360 />} />
            <Route path="/mobile-photobooth" element={<MobilePhotobooth />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/book-now" element={<BookNow />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/stanchions" element={<Stanchions />} />
            <Route path="/power-station" element={<PowerStation />} />
            <Route path="/props" element={<Props />} />
            <Route path="/lighting" element={<Lighting />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
