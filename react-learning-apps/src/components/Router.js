import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import Login from "./Login";
import { ProtectedRoute } from "../utils/ProtectedRoute";

const LazyUserForm = lazy(() => import("./UserForm"));
const LazyHome = lazy(() => import("./Home"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <LazyHome />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: (
            <ProtectedRoute>
                <LazyUserForm />
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