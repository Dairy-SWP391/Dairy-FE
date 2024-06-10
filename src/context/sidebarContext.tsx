import {
  useState,
  ReactNode,
  createContext,
  useContext,
  useEffect
} from "react";
import { useLocation } from "react-router-dom";
import useScrollLock from "../hooks/useScrollLock";

type SidebarContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {}
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const setIsLocked = useScrollLock();

  // close sidebar when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (open) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }

    return () => {
      setIsLocked(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
