import { lazy } from "react";
import Loadable from "../ui-component/Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "../utils/AuthGuard"; // Import AuthGuard

// halaman utama
const Delivery = Loadable(lazy(() => import("../views/customer/delivery")));
const Service = Loadable(lazy(() => import("../views/customer/service")));
const VehicleDoc = Loadable(lazy(() => import("../views/customer/vehicleDoc")));
const VehicleDetail = Loadable(
  lazy(() => import("../views/customer/vehicleDetail"))
); // Import VehicleDetail

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: (
        <AuthGuard>
          <Delivery />
        </AuthGuard>
      ),
    },
    {
      path: "customer",
      children: [
        {
          path: "delivery",
          element: (
            <AuthGuard>
              <Delivery />
            </AuthGuard>
          ),
        },
        {
          path: "service",
          element: (
            <AuthGuard>
              <Service />
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
  ],
};

export default MainRoutes;
