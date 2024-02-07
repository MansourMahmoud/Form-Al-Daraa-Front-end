import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { navListItem } from "../utils/navListItem";
import { Link } from "react-router-dom";
import IconDarkMode from "../components/IconDarkMode";
import { websiteLogo } from "../utils/logo";

const Header = ({ setIsDarkModeActive }) => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  //   content list
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0  lg:flex-row lg:items-center lg:gap-2 xl:gap-4">
      {navListItem?.map((item, index) => (
        <Link
          key={index}
          to={item.goTo}
          className="flex  w-full items-center lg:w-fit rounded  hover:bg-darkMode-dark100 group duration-300 transition-all"
        >
          <Button
            variant="text"
            className="font-normal text-start lg:items-center text-darkMode-dark50 rounded dark-text text-base w-full hover:bg-darkMode-dark100 dark-style-hover duration-300 transition-all group-hover:text-darkMode-dark950  p-2 "
            onClick={() => setOpenNav(false)}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </ul>
  );

  return (
    <Navbar className="dark:bg-darkMode-dark900 bg-[#2a7199] border-[#2a7199] sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 dark:border-darkMode-dark950 dark:outline-darkMode-dark950">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          target="_blank"
          to="https://sa.al-daraa.com"
          className="mr-4 cursor-pointer hover:scale-105 dark:hover:shadow-sm p-2 dark:hover:rounded-full dark:hover:shadow-white duration-300 transition-all ease-in-out "
        >
          <img
            src={websiteLogo}
            className="rounded object-contain"
            alt="logo"
            width={45}
            height={45}
          />
        </Link>
        <div className="flex items-center justify-between lg:gap-0 lg:w-full">
          <div className="flex items-center">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {/* Component Icon Dark Mode */}
            <IconDarkMode
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              setIsDarkModeActive={setIsDarkModeActive}
            />
          </div>

          <IconButton
            variant="text"
            className="dark-text ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 text-darkMode-dark50"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-darkMode-dark50"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      {/* mobile */}
      <MobileNav
        className={`${openNav === true && "mt-5"} duration-150`}
        open={openNav}
      >
        {navList}
      </MobileNav>
      {/* end */}
    </Navbar>
  );
};

export default Header;
