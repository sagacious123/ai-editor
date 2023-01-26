import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="bg-gray-200 min-h-screen w-56 py-4 ">
      <h3 style={{fontFamily: "'Montserrat', sans-serif"}} className="text-2xl text-rose-600 font-semibold px-4  ">AI Editor</h3>
      <ul className="mt-20 text-base ">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive || window.location.pathname.includes("overview/")
                ? " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300 bg-gray-300"
                : " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300"
            }
            to="/"
          >
            Text Editor
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive || window.location.pathname.includes("overview/")
                ? " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300 bg-gray-300"
                : " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300"
            }
            to="/image_generator"
          >
            Image Generator
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive || window.location.pathname.includes("overview/")
                ? " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300 bg-gray-300"
                : " font-light text-gray-700 block px-4 py-2 hover:bg-gray-300"
            }
            to="/essay_outline_generator"
          >
            Essay Outline Generator
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
