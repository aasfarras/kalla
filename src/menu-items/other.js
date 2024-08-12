// assets
import { IconZoomExclamation } from "@tabler/icons-react";

// constant
const icons = { IconZoomExclamation };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const other = {
  id: "other",
  title: "Other",
  type: "group",
  children: [
    {
      id: "about",
      title: "Bantuan",
      type: "item",
      url: "https://wa.me/081242789195",
      icon: icons.IconZoomExclamation,
      breadcrumbs: false,
    },
  ],
};

export default other;
