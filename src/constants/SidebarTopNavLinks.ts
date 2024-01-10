import { SidebarNavProps } from "@/props/SidebarNavProps";
import { FaBookmark } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { MdSpaceDashboard } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";

// Sidebar top naviagtion list routes
const ROUTES = {
  DASHBOARD: "dashboard",
  TASKS: "tasks",
  COMPLETED_TASKS: "completedtasks",
  WATCH_LATER: "watchlater",
  NOTES: "notes",
};

// Sidebar top naviagtion list items
export const SidebarTopNavLinks: SidebarNavProps[] = [
  {
    text: "Dashboard",
    href: ROUTES.DASHBOARD,
    Icon: MdSpaceDashboard,
    size: 1.2,
  },
  {
    text: "My Tasks",
    href: ROUTES.TASKS,
    Icon: SlMenu,
    size: 1,
  },
  {
    text: "Completed Tasks",
    href: ROUTES.COMPLETED_TASKS,
    Icon: GrTask,
    size: 1.1,
  },
  {
    text: "Watch later",
    href: ROUTES.WATCH_LATER,
    Icon: FaBookmark,
    size: 1.3,
  },
  {
    text: "Notes",
    href: ROUTES.NOTES,
    Icon: PiNotepadFill,
    size: 1.5,
  },
];
