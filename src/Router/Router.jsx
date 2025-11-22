import { createBrowserRouter } from "react-router";

import Layout from "../Layout/Layout";
import Deshboard from "../Pages/Deshboard/Deshboard";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Login from "../Pages/AuthenticationPages/Login/Login";
import Register from "../Pages/AuthenticationPages/Register/Register";
import ResetPassword from "../Pages/AuthenticationPages/ResetPassword/ResetPassword";
import TwoSteps from "../Pages/AuthenticationPages/TwoSteps/TwoSteps";
import ForgotPassword from "../Pages/AuthenticationPages/ForgotPassword/ForgotPassword";
import VerifyEmail from "../Pages/AuthenticationPages/VerifyEmail/VerifyEmail";
// import PublicRoute from "../Security/PublicRoute";
// import NoLoginRoute from "../Security/NoLoginRoute";
import Profile from "../Pages/Profile/Profile";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Course from "../Pages/Academic/Course";
import Table from "../componentes/Table";
import Card from "../componentes/Card";
// import CheckAdmin from "../Security/CheckAdmin";

export const router = createBrowserRouter([
    {
        path: "/",
        // element: <PublicRoute><Layout /></PublicRoute>,
        element: <Layout />,
        children: [
            {
                index: true,
                Component: Deshboard,
            },
            {
                path: "dashbord",
                Component: Deshboard,
            },
            {
                path: "card",
                Component: Card,
            },
            {
                path: "table",
                Component: Table,
            },
            {
                path: "course",
                Component: Course,
            },
            {
                path: "profile",
                Component: Profile,
            },
        ]
    },
    {
        path: "/",
        // element: <NoLoginRoute><AuthenticationLayout/></NoLoginRoute>,
        Component: AuthenticationLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register,
            },
            {
                path: "reset-password",
                Component: ResetPassword,
            },
            {
                path: "forgot-password",
                Component: ForgotPassword,
            },
            {
                path: "two-steps",
                Component: TwoSteps
            },
            {
                path: "verify-email",
                Component: VerifyEmail,
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }

]);