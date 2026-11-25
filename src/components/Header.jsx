import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import { Container } from "./ui";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Our Position", path: "/position" },
  { label: "The Bureau", path: "/bureau" },
  { label: "Statements", path: "/statements" },
  { label: "Documents", path: "/documents" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  // The page the menu was opened on; it closes itself on any navigation.
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (value) => setOpenOn(value ? pathname : null);

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <Logo />
          <span className="brand__text">
            <strong>JKLF Diplomatic Bureau</strong>
            <span>Jammu Kashmir Liberation Front</span>
          </span>
        </NavLink>

        <nav
          id="site-nav"
          className={`site-nav ${open ? "site-nav--open" : ""}`}
          aria-label="Main"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
    </header>
  );
}
