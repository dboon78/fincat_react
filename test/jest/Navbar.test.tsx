import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { useAuth, UserProvider } from "../../src/Context/useAuth";
import Navbar from "../../src/Components/Navbar/Navbar";

// Mock useAuth to provide controlled test values
jest.mock("../../Context/useAuth", () => ({
  ...jest.requireActual("../../Context/useAuth"),
  useAuth: jest.fn(),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    // Mock implementation for isLoggedIn and user
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: jest.fn(() => true),
      user: { userName: "JohnDoe" },
      logout: jest.fn(),
    });
  });

  test("renders Navbar with user logged in", () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </MemoryRouter>
    );

    // Check if the welcome message is displayed
    expect(screen.getByText(/Welcome, JohnDoe/i)).toBeInTheDocument();

    // Check if the logout button is displayed
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: jest.fn(() => true),
      user: { userName: "JohnDoe" },
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </MemoryRouter>
    );

    // Click the logout button
    fireEvent.click(screen.getByText(/Logout/i));

    // Check if the logout function was called
    expect(mockLogout).toHaveBeenCalled();
  });

  test("renders Navbar with user logged out", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: jest.fn(() => false),
      user: null,
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </MemoryRouter>
    );

    // Check if the login link is displayed
    expect(screen.getByText(/Login/i)).toBeInTheDocument();

    // Check if the signup link is displayed
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  });
});
