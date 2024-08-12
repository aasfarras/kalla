import { lazy } from "react";
import Loadable from "../ui-component/Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "../utils/AuthGuard"; // Import AuthGuard
import { element } from "prop-types";

// halaman utama
const Dashboard = Loadable(lazy(() => import("../views/customer/dashboard")));
const ServiceTabel = Loadable(
  lazy(() => import("../views/customer/serviceTabel"))
);
const VehicleDoc = Loadable(lazy(() => import("../views/customer/vehicleDoc")));
const VehicleDetail = Loadable(
  lazy(() => import("../views/customer/vehicleDetail"))
);
const About = Loadable(lazy(() => import("../views/other/about")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: (
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
      path: "customer",
      children: [
        {
          path: "dashboard",
          element: (
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          ),
        },
        {
          path: "service",
          element: (
            <AuthGuard>
              <ServiceTabel />
            </AuthGuard>
          ),
        },
        {
          path: "vehicleDoc",
          element: (
            <AuthGuard>
              <VehicleDoc />
            </AuthGuard>
          ),
        },
        {
          path: "vehicle/:id", // Rute baru untuk halaman detail
          element: (
            <AuthGuard>
              <VehicleDetail />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "other",
      children: [
        {
          path: "about",
          element: (
            <AuthGuard>
              <About />
            </AuthGuard>
          ),
        },
      ],
    },
  ],
};

export default MainRoutes;
