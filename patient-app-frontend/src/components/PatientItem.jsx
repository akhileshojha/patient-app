import React from "react";
import { Link } from "react-router-dom";

export default function PatientItem({ patient, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-gray-600">Age: {patient.age}</p>
          <p className="text-gray-600">Gender: {patient.gender}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/edit/${patient._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(patient._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Contact Information</h3>
        <p className="text-gray-600">Email: {patient.contact?.email}</p>
        <p className="text-gray-600">Phone: {patient.contact?.phone}</p>
      </div>
      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium mb-2">Clinical BioData</h3>
        <p className="text-gray-600">
          Blood Type: {patient.clinicalBioData?.bloodType}
        </p>
        <p className="text-gray-600">
          Allergies: {patient.clinicalBioData?.allergies?.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
}
