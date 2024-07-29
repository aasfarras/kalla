import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const Delivery = Loadable(lazy(() => import("../views/customer/delivery")));
const Service = Loadable(lazy(() => import("../views/customer/service")));
const VehicleDoc = Loadable(lazy(() => import("../views/customer/vehicleDoc")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Delivery />,
    },
    {
      path: "customer",
      children: [
        {
          path: "delivery",
          element: <Delivery />,
        },
      ],
    },
    {
      path: "customer",
      children: [
        {
          path: "Service",
          element: <Service />,
        },
      ],
    },
    {
      path: "customer",
      children: [
        {
          path: "vehicleDoc",
          element: <VehicleDoc />,
        },
      ],
    },
  ],
};

export default MainRoutes;
