import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Patient Management
          </Link>
          <Link
            to="/create"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            New Patient
          </Link>
        </div>
      </div>
    </nav>
  );
}
