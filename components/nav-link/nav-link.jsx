"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "@/components/nav-link/nav-link.module.css";

const NavLink = ({ exact = false, href, label }) => {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const className = `${classes.link} ${isActive ? classes.active : ""}`.trim();

  return (
    <Link
      href={href}
      className={className}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

export default NavLink;
