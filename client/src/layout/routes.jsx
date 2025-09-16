import { RiDashboardLine } from "react-icons/ri";
import { BsExclamationLg } from "react-icons/bs";
import { BsListStars } from "react-icons/bs";
import { PiNotepadFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";

export const routes = [
  {
    icon: <RiDashboardLine />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BsExclamationLg />,
    name: "My Projects",
    path: "/admin/my-projects",
  },
  {
    icon: <PiNotepadFill />,
    name: "My Task",
    path: "/admin/my-task",
  },
  {
    icon: <BsListStars />,
    name: "Task Categories",
    path: "/admin/task-categories",
  },
  {
    icon: <IoMdSettings />,
    name: "Setting",
    path: "/admin/setting",
  },
  {
    icon: <IoMdHelpCircle />,
    name: "Help",
    path: "/admin/help",
  },
];
