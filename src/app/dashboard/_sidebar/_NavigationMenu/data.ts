import { HomeIcon } from "@/app/component/Next-Icon-Component/Icons";
import DashboardIcon from "../../../../../public/assets/icons/grid.svg"
import ActiveIcon from "../../../../../public/assets/icons/flash.svg"
import DeactiveIcon from "../../../../../public/assets/icons/flash-off.svg"


const data = [
  {
    id: "1",
    title: "Dashboard",
    link: "/",
    component: DashboardIcon,
  },
  {
    id: "2",
    title: "Active",
    link: "/dashboard/active",
    component: ActiveIcon,
  },
  {
    id: "3",
    title: "Deactive",
    link: "/deactive",
    component: DeactiveIcon,
  },
  {
    id: "4",
    title: "Archieve",
    link: "/archieve",
    component: HomeIcon,
  },
];

export default data;
