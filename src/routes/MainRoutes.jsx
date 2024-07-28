import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import { element } from "prop-types";

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));
const Produk = Loadable(lazy(() => import("../views/manajemen/produk")));
const Sales = Loadable(lazy(() => import("../views/manajemen/sales")));
const Pelanggan = Loadable(lazy(() => import("../views/manajemen/pelanggan")));
const Transaksi = Loadable(lazy(() => import("../views/other/transaksi")));
const Laporan = Loadable(lazy(() => import("../views/other/laporan")));
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
    // {
    //   path: "dashboard",
    //   children: [
    //     {
    //       path: "default",
    //       element: <DashboardDefault />,
    //     },
    //   ],
    // },
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
