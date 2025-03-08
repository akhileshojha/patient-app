import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/create" element={<PatientForm />} />
          <Route path="/edit/:id" element={<PatientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
