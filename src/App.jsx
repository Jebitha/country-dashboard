import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
function App() {
  return (
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
  );
}

export default App;
