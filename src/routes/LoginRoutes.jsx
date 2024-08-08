import { lazy } from "react";

// project imports
// import GuestGuard from "../utils/route-guard/GuestGuard";
import MinimalLayout from "../layout/MinimalLayout";
// import NavMotion from "../layout/NavMotion";
import Loadable from "../ui-component/Loadable";

// login routing
const AuthLogin = Loadable(
  lazy(() => import("../views/pages/authentication3/Login3"))
);
const Delivery = Loadable(lazy(() => import("../views/customer/delivery")));
// const AuthRegister = Loadable(
//   lazy(() => import("../views/pages/authentication3/Register3"))
// );
// const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/",
      element: <AuthLogin />,
    },
    {
      path: "/login",
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;
