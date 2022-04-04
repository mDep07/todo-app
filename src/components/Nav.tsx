import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { IoMoon, IoSunny } from "react-icons/io5";
import StyledSwitchTheme from "../styles/SwitchTheme";
import StyledNavbar from "../styles/Navbar";

export default function Nav({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) {
  const location = useLocation();

  return (
    <StyledNavbar>
      <ul>
        {
          [
            ['Tasks', '/'],
            ['Folders', '/folders'],
            ['Tags', '/tags'],
          ].map(([label, path]) => (
            <li key={label}>
              <Link to={path} className={location.pathname === path ? 'active' : ''}>
                {label}
              </Link>
            </li>
          ))
        }
      </ul>

      <div>
        <StyledSwitchTheme title="Change theme mode" onClick={toggleTheme}>
          { theme === 'light' ? <IoMoon /> : <IoSunny /> }
        </StyledSwitchTheme>
      </div>
    </StyledNavbar>
  )
}