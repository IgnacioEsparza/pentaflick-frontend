import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WatchedMovies } from './pages/WatchedMovies';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watched" element={<WatchedMovies />} />
          </Routes>
        </main>
        <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
            <p>PentaFlick © 2024 - Películas según tu estado de ánimo</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
