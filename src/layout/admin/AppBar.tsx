// components
import Search from "../../components/Search";
import Headroom from "react-headroom";
// import NotificationsPanel from "../../components/NotificationsPanel";
// import MessagesPanel from "../../components/MessagesPanel";

// hooks
import { useSidebar } from "../../context/sidebarContext";
import useWindowSize from "../../hooks/useWindowSize";
import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

const AppBar = () => {
  // const [notificationsPanelOpen, setNotificationsPanelOpen] =
  useState<boolean>(false);
  // const [messagesPanelOpen, setMessagesPanelOpen] = useState<boolean>(false);
  const { width } = useWindowSize();
  const { setOpen } = useSidebar();
  const { clearToken } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logOut = () => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      clearToken();
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Headroom style={{ zIndex: 999 }}>
        <div className="flex items-center justify-between">
          {width < 1920 && (
            <button
              className="icon text-2xl leading-none"
              aria-label="Open sidebar"
              onClick={() => setOpen(true)}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          )}
          {width >= 768 && (
            <Search wrapperClass="flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0" />
          )}
          <div className="flex items-center gap-5 md:ml-5 xl:gap-[26px]">
            {/* <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
              <button
                className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                onClick={() => setNotificationsPanelOpen(true)}
                aria-label="Notifications"
              >
                <i className="fa fa-bell" aria-hidden="true"></i>
              </button>
              <span
                className="absolute w-3 h-3 rounded-full bg-red-500 -top-1.5 -right-1.5 border-[2px] border-body
                                  xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
              >
                <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                  7
                </span>
              </span>
            </div> */}
            {/* <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
              <button
                className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                onClick={() => setMessagesPanelOpen(true)}
                aria-label="Messages"
              >
                <i className="fa fa-comment" aria-hidden="true"></i>
              </button>
              <span
                className="absolute w-3 h-3 rounded-full bg-green-500 -top-1.5 -right-1.5 border-[2px] border-body
                                  xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
              >
                <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                  2
                </span>
              </span>
            </div> */}
            <div className="relative">
              <button
                className="h-8 w-8 rounded-full bg-[#035ECF] text-widget text-sm flex items-center
                                    justify-center relative xl:w-11 xl:h-11 xl:text-lg"
                onClick={logOut}
                aria-label="Account menu"
              >
                <i className="fa fa-user text-white" aria-hidden="true"></i>
              </button>
              <span className="badge-online" />
            </div>
          </div>
        </div>
      </Headroom>
      {/* <NotificationsPanel
        open={notificationsPanelOpen}
        onOpen={() => setNotificationsPanelOpen(true)}
        onClose={() => setNotificationsPanelOpen(false)}
      />
      <MessagesPanel
        open={messagesPanelOpen}
        onOpen={() => setMessagesPanelOpen(true)}
        onClose={() => setMessagesPanelOpen(false)}
      /> */}
    </>
  );
};

export default AppBar;
