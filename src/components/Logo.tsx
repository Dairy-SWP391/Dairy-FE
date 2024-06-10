// components
import { NavLink } from "react-router-dom";

// utils
import { memo } from "react";
import logo from "../assets/logo-no-background.png";

const Logo = ({
  imgClass,
  textClass
}: {
  imgClass?: string;
  textClass?: string;
}) => {
  return (
    <NavLink className="inline-flex items-center gap-3" to="/">
      <span className={`relative w-10 ${imgClass || ""}`}>
        <img src={logo} alt="Dairy" />
      </span>
      <h4 className={`logo_text ${textClass || ""}`}>Dairy</h4>
    </NavLink>
  );
};

export default memo(Logo);
