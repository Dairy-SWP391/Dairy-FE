// components
import { NavLink } from "react-router-dom";

// utils
import { memo } from "react";
import logo from "../assets/logoapp.jpg";

const Logo = ({
  imgClass,
  textClass,
}: {
  imgClass?: string;
  textClass?: string;
}) => {
  return (
    <NavLink className="logo" to="/">
      <span className={`logo_img relative ${imgClass || ""}`}>
        <img src={logo} alt="Dairy" />
      </span>
      <h4 className={`logo_text ${textClass || ""}`}>Dairy</h4>
    </NavLink>
  );
};

export default memo(Logo);
