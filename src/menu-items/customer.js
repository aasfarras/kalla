// assets
import {
  IconDashboard,
  IconListDetails,
  IconCar,
  IconUserScan,
} from "@tabler/icons-react";

// constant
const icons = { IconDashboard, IconListDetails, IconCar, IconUserScan };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const customer = {
  id: "customer",
  title: "Customer",
  type: "group",
  children: [
    {
      id: "delivery",
      title: "Delivery",
      type: "item",
      url: "/customer/delivery",
      icon: icons.IconCar,
      breadcrumbs: false,
    },
    {
      id: "service",
      title: "Service",
      type: "item",
      url: "/customer/service",
      icon: icons.IconListDetails,
      breadcrumbs: false,
    },
    {
      id: "vehicleDoc",
      title: "Vehicle Doc",
      type: "item",
      url: "/customer/vehicleDoc",
      icon: icons.IconUserScan,
      breadcrumbs: false,
    },
  ],
};

export default customer;
