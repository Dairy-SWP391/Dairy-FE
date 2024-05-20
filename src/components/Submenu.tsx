// components
import Menu from "@mui/material/Menu";
import { ReactNode } from "react";

interface SubmenuProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anchorEl: any;
}

const Submenu = ({ children, open, onClose, anchorEl }: SubmenuProps) => {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      elevation={0}
      classes={{
        paper: "!shadow !min-w-[210px] rounded-md !bg-widget",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        transform: "translateX(-16px) translateY(-10px)",
        "& .MuiMenu-list": {
          padding: 0,
          color: "var(--text)",
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default Submenu;
