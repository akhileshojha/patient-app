const mongoose = require("mongoose");

const clinicalBioDataSchema = new mongoose.Schema({
  bloodType: String,
  allergies: [String],
  chronicConditions: [String],
  medications: [String],
  lastPhysicalExam: Date,
});

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  contact: {
    email: String,
    phone: String,
  },
  clinicalBioData: clinicalBioDataSchema,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
