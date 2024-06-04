// components
import Modal from "@mui/material/Modal";
import Grow from "@mui/material/Grow";
import { ReactElement } from "react";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

const ModalBase = ({ open, onClose, children }: ModalBaseProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      classes={{
        root: "flex justify-center items-center p-5",
      }}
      closeAfterTransition
    >
      <Grow in={open} timeout={300}>
        {children}
      </Grow>
    </Modal>
  );
};

export default ModalBase;
