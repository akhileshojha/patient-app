// src/services/api.js
import axios from "axios";
//import { useLoadingStore } from "../stores/loadingStore"; // Optional loading state management

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000, // 10-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token and handling loading states
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Start loading indicator
    //useLoadingStore.getState().startLoading();

    // Add AbortController to handle request cancellation
    const controller = new AbortController();
    config.signal = controller.signal;

    return {
      ...config,
      metadata: { controller },
    };
  },
  (error) => {
    //useLoadingStore.getState().stopLoading();
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors and loading states
API.interceptors.response.use(
  (response) => {
    //useLoadingStore.getState().stopLoading();
    return {
      ...response,
      data: response.data,
    };
  },
  (error) => {
    //useLoadingStore.getState().stopLoading();

    const errorResponse = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An unexpected error occurred",
      data: error.response?.data,
      originalError: error,
    };

    // Handle specific error codes
    if (errorResponse.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }

    return Promise.reject(errorResponse);
  },
);

// Abort ongoing request
export const abortRequest = (controller) => {
  if (controller) {
    controller.abort();
  }
};

// API Methods
export const apiService = {
  patients: {
    getAll: (params) => API.get("/patients", { params }),
    getById: (id) => API.get(`/patients/${id}`),
    create: (patientData) => API.post("/patients", patientData),
    update: (id, patientData) => API.put(`/patients/${id}`, patientData),
    delete: (id) => API.delete(`/patients/${id}`),
    search: (query) => API.get("/patients/search", { params: { q: query } }),
  },
  // Add more resources as needed
};

// Utility functions
export const createCancellableRequest = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};

// Alternative method for direct API access
export const getPatients = (params = {}, options = {}) =>
  API.get("/patients", { params, ...options });

export const getPatientById = (id, options = {}) =>
  API.get(`/patients/${id}`, options);

export const createPatient = (patientData, options = {}) =>
  API.post("/patients", patientData, options);

export const updatePatient = (id, patientData, options = {}) =>
  API.put(`/patients/${id}`, patientData, options);

export const deletePatient = (id, options = {}) =>
  API.delete(`/patients/${id}`, options);

export default API;
