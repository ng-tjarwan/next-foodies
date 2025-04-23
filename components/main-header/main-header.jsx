import Image from "next/image";
import Link from "next/link";

import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/nav-link/nav-link";

import logoImage from "@/assets/logo.png";

import classes from "@/components/main-header/main-header.module.css";

const navLinks = [
  {
    label: "Browse Meals",
    href: "/meals",
  },
  {
    label: "Foodies Community",
    href: "/community",
    exact: true,
  },
];

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            {navLinks?.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
