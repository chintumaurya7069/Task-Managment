import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./Adminlayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Help from "../pages/dashboard/Help";
import MyTask from "../pages/dashboard/MyTask";
import Setting from "../pages/dashboard/Setting";
import TaskCategories from "../pages/dashboard/TaskCategories";
import VitalTask from "../pages/dashboard/VitalTask";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/dashboard/Profile";
import ChangePassword from "../pages/dashboard/ChangePassword";

// Dummy auth check (replace with real logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute element={<AdminLayout />} />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "my-task",
        element: <MyTask />,
      },
      {
        path: "my-projects",
        element: <VitalTask />,
      },
      {
        path: "task-categories",
        element: <TaskCategories />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "profile", 
        element: <Profile />,
      },
      {
        path: "change-password", 
        element: <ChangePassword />,
      },

    ],
  },
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
