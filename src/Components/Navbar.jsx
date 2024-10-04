import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-12 border-2 border-black p-4 text-3xl pl-[40%] bg-indigo-950 text-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-slate-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? "text-white" : "text-slate-600"
        }
      >
        Pastes
      </NavLink>
    </div>
  );
}

export default Navbar