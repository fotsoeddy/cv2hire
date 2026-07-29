import {
  LayoutDashboard,
  FileSearch,
  Sparkles,
  Mic,
  History,
  Briefcase,
  Send,
  User,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Career Tools",
    items: [
      { label: "Resume Analysis", href: "/dashboard/cv/upload", icon: FileSearch },
      { label: "Resume Builder", href: "/cv-builder", icon: Sparkles },
    ],
  },
  {
    label: "Interview Prep",
    items: [
      { label: "AI Mock Interview", href: "/dashboard/mock-interview", icon: Mic },
      { label: "Interviews", href: "/dashboard/interviews", icon: History },
      { label: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Applications", href: "/dashboard/applications", icon: Send },
      { label: "Profile", href: "/dashboard/profile", icon: User },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/dashboard") return false;
  return pathname.startsWith(`${href}/`);
}
