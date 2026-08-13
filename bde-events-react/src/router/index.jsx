import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layout/layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import DashboardAdmin from "@/pages/dashboard/dashboardAdmin";
import DashboardStudent from "@/pages/dashboard/dashboardStudent";
import ProtectedRoute from "@/router/ProtectedRoute";
import Form from "@/pages/Form";
import Tickets from "@/pages/Tickets";

const router= createBrowserRouter([
    {
        element: <Layout />,
        children: [
             {
path: "/",
element: <HomePage />,

    },

{
path: "/login",
element: <Login />,
},
{
    path:"/register",
    element: <Register />,
},

{
    path: "/dashboard/dashboardAdmin",
    element:<ProtectedRoute role="admin">
     <DashboardAdmin />,
    </ProtectedRoute>
},
{
    path: "/dashboard/dashboardStudent",
    element: <ProtectedRoute role="student">
      <DashboardStudent />
    </ProtectedRoute>,
},
{
    path: "/form",
    element: <ProtectedRoute role="admin">
      <Form />
    </ProtectedRoute>
  },
{
    path :"/form/:id",
    element: <ProtectedRoute role="admin">
        <Form />
    </ProtectedRoute>
},

        ]
    }

])
export {router}