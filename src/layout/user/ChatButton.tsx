import { LuMessageCircle } from "react-icons/lu";

const ChatButton = () => {
  return (
    <div className="sticky bottom-0 px-5 flex py-5 justify-end">
      <LuMessageCircle className="text-6xl border rounded-full bg-blue-500 p-2 text-white cursor-pointer" />
    </div>
  );
};

export default ChatButton;
