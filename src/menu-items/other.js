// assets
import {
  IconCash,
  IconFileAnalytics,
  IconZoomExclamation,
} from "@tabler/icons-react";

// constant
const icons = { IconCash, IconFileAnalytics, IconZoomExclamation };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const other = {
  id: "other",
  title: "Other",
  type: "group",
  children: [
    {
      id: "about",
      title: "About",
      type: "item",
      url: "/other/about",
      icon: icons.IconZoomExclamation,
      breadcrumbs: false,
    },
  ],
};

export default other;
