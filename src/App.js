import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Admin from './Admin';

import Home from "./Hack"


function App() {

  return (
      <Router>
        <Routes>
          {/* Public Routes: Accessible when the user is not authenticated */}
          <Route path="/home" element={ <Home />} />


          {/* <Route path="/admin" element={<Admin/>} /> */}


          {/* Redirect all other routes to /dashboard if user is not logged in */}
          <Route path="*" element={<Navigate to="/home" /> } />
        </Routes>
      </Router>
  );
}

export default App;