import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Mock Route</div>,
}));

test("renders patient management header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Patient Management/i);
  expect(headerElement).toBeInTheDocument();
});
