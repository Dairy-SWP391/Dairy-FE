/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// styled components
import Drawer from "./styles";

// components
import Logo from "../../../components/Logo";
import { NavLink } from "react-router-dom";
import Collapse from "@mui/material/Collapse";

// hooks
import { useSidebar } from "../../../context/sidebarContext";
import { useState, useEffect, Fragment } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

// constants
import ROUTES from "../../../constants/routes";

const Sidebar = () => {
  const { width } = useWindowSize();
  const { open, setOpen } = useSidebar();
  const [active, setActive] = useState("Dashboard");
  const isPermanent = width >= 1920;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setActive("");
    });

    return () => {
      window.removeEventListener("resize", () => {
        setActive("");
      });
    };
  }, []);

  return (
    <Drawer
      id="appMenu"
      anchor="left"
      transitionDuration={350}
      open={open}
      variant={isPermanent ? "permanent" : "temporary"}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Logo />
      <nav className="menu">
        {ROUTES.map((route, index) => {
          return (
            <Fragment key={route.name}>
              {route.links && (
                <>
                  <div>
                    <div
                      className={`menu_item ${active === route.name ? "active" : ""}`}
                      onClick={() =>
                        setActive(active === route.name ? "" : route.name)
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <i
                          className={`fa ${route.icon}`}
                          aria-hidden="true"
                        ></i>
                        <span className="text">{route.name}</span>
                      </div>
                      <button
                        className="xl:hidden 4xl:block"
                        aria-label="Toggle submenu"
                      >
                        <i
                          className="icon fa fa-caret-right"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                    <Collapse
                      in={active === route.name}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="submenu flex flex-col gap-2.5">
                        {route.links.map((link) => {
                          return (
                            <NavLink
                              className="submenu_item menu_item"
                              to={link.path}
                              key={link.name}
                            >
                              <span className="flex items-center gap-2.5">
                                <i
                                  className="fa fa-circle text-slate-500"
                                  aria-hidden="true"
                                ></i>
                                <span>{link.name}</span>
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </Collapse>
                  </div>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
              {!route.links && (
                <>
                  <NavLink className="menu_item" to={route.path}>
                    <div className="flex items-center gap-2.5">
                      <i className={`fa ${route.icon}`} />
                      <span className="text">{route.name}</span>
                    </div>
                  </NavLink>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </nav>
    </Drawer>
  );
};

export default Sidebar;
