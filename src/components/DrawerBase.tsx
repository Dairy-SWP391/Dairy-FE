// components
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export enum Anchor {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

interface DrawerBaseProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  anchor?: Anchor;
  children: React.ReactNode;
}

const DrawerBase = ({
  open,
  onOpen,
  onClose,
  anchor = Anchor.LEFT,
  children,
}: DrawerBaseProps) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "var(--shadow)",
          background: "var(--widget)",
          color: "var(--text)",
          height: "var(--app-height)",
          minHeight: "-webkit-fill-available",
        },
      }}
      classes={{
        paper: "!w-full sm:!w-[342px] flex flex-col",
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default DrawerBase;
