import { createBrowserRouter } from "react-router-dom";
import UserForm from "./UserForm";
import Home from "./Home";
import Login from "./Login";
import { ProtectedRoute } from "../utils/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: (
            <ProtectedRoute>
                <UserForm />
            </ProtectedRoute>
        ),
        loader: () => {
            console.log("Loading register page...");
        },
        action: () => {
            console.log("Register action...");
        }
    }
]);

export default router;