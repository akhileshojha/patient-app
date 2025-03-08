import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPatient, updatePatient, getPatientById } from "../services/api";

export default function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contact: { email: "", phone: "" },
    clinicalBioData: {
      bloodType: "",
      allergies: [],
      chronicConditions: [],
      medications: [],
      lastPhysicalExam: "",
    },
  });

  const [currentAllergy, setCurrentAllergy] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const { data } = await getPatientById(id);
          setFormData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayAdd = (type) => {
    const value = {
      allergies: currentAllergy,
      chronicConditions: currentCondition,
      medications: currentMedication,
    }[type];

    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        clinicalBioData: {
          ...prev.clinicalBioData,
          [type]: [...prev.clinicalBioData[type], value.trim()],
        },
      }));
      switch (type) {
        case "allergies":
          setCurrentAllergy("");
          break;
        case "chronicConditions":
          setCurrentCondition("");
          break;
        case "medications":
          setCurrentMedication("");
          break;
        default:
          setCurrentMedication("");
      }
    }
  };

  const handleArrayRemove = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      clinicalBioData: {
        ...prev.clinicalBioData,
        [type]: prev.clinicalBioData[type].filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePatient(id, formData);
      } else {
        await createPatient(formData);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Patient" : "Create New Patient"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Clinical BioData */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Clinical Information</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Blood Type</label>
            <input
              type="text"
              name="clinicalBioData.bloodType"
              value={formData.clinicalBioData.bloodType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Allergies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentAllergy}
                onChange={(e) => setCurrentAllergy(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Add allergy"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd("allergies")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.clinicalBioData.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                >
                  {allergy}
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("allergies", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Similar blocks for chronicConditions and medications */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Last Physical Exam
            </label>
            <input
              type="date"
              name="clinicalBioData.lastPhysicalExam"
              value={formData.clinicalBioData.lastPhysicalExam}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          {id ? "Update Patient" : "Create Patient"}
        </button>
      </form>
    </div>
  );
}
