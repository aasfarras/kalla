import { lazy } from "react";
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import GuestGuard from "../utils/GuestGuard"; // Import GuestGuard

// halaman login
const AuthLogin = Loadable(
  lazy(() => import("../views/pages/authentication3/Login3"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: (
        <GuestGuard>
          <AuthLogin />
        </GuestGuard>
      ),
    },
    // Jika Anda ingin rute utama diarahkan ke login, Anda bisa menambahkan ini:
    {
      path: "/",
      element: (
        <GuestGuard>
          <AuthLogin />
        </GuestGuard>
      ),
    },
  ],
};

export default AuthenticationRoutes;
