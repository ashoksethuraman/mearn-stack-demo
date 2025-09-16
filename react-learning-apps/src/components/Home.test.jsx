import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "./Home";

// Mock redux store
const mockStore = configureStore([]);

// Mock fetch globally
beforeEach(() => {
  fetch.resetMocks();
});

// beforeEach(() => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ name: "Test User" }), // mock response
//     })
//   );
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe("Home Component", () => {
  test("renders Login button when not authenticated", () => {
    const store = mockStore({
      user: { user: null, isAuthenticated: false },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders Welcome message when authenticated", () => {
    const store = mockStore({
      user: { user: { name: "Ashok", email: "ashok@test.com" }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Welcome, Ashok/)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("fetches and displays user data", async () => {
    const store = mockStore({
      user: { user: null, isAuthenticated: false },
    });

    // Mock API response
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "1234",
          dateOfBirth: "2000-01-01T00:00:00.000Z",
          file: { filename: "resume.pdf", data: { data: [] }, mimetype: "application/pdf" },
        },
      ])
    );

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Wait for user data to render
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });

  test("calls handleDelete when delete button is clicked", async () => {
    const store = mockStore({
      user: { user: null, isAuthenticated: false },
    });

    // Mock user data
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "1234",
          file: { filename: "resume.pdf", data: { data: [] }, mimetype: "application/pdf" },
        },
      ])
    );

    // Mock DELETE API
    fetch.mockResponseOnce(JSON.stringify({ success: true }), { status: 200 });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Wait until user appears
    await waitFor(() => screen.getByText("John Doe"));

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/user/1", { method: "DELETE" });
    });
  });

  test("paginates correctly", async () => {
    const store = mockStore({
      user: { user: null, isAuthenticated: false },
    });

    // Generate 5 users (rowsPerPage = 4)
    const mockUsers = Array.from({ length: 5 }, (_, i) => ({
      _id: i + 1,
      name: `User${i + 1}`,
      email: `user${i + 1}@test.com`,
      password: "pass",
      file: { filename: "file.txt", data: { data: [] }, mimetype: "text/plain" },
    }));

    fetch.mockResponseOnce(JSON.stringify(mockUsers));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Wait for first page to render
    await waitFor(() => screen.getByText("User1"));

    // Page 1 should show 4 users
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User4")).toBeInTheDocument();
    expect(screen.queryByText("User5")).not.toBeInTheDocument();

    // Go to page 2
    fireEvent.click(screen.getByText("2"));

    await waitFor(() => {
      expect(screen.getByText("User5")).toBeInTheDocument();
    });
  });
});
