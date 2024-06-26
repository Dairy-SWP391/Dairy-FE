import { FormEvent, useEffect, useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import { Card, CardBody } from "@nextui-org/react";
import { UserType } from "../../store/user";
import socket from "../../utils/socket";
import { useNavigate } from "react-router-dom";

const ChatButton = ({ user }: { user: UserType | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const [conversations, setConversations] = useState<
    { content: string; isSender: boolean }[]
  >([]);

  useEffect(() => {
    socket.auth = { _id: user?.id };

    socket.connect();

    socket.on("receive_message", (data) => {
      console.log(data);
      const { content } = data;
      console.log(content);
      setConversations((prev) => [
        ...prev,
        {
          content,
          isSender: false
        }
      ]);
    });

    //clean up function : khi component bị unmount thì sẽ disconnect| phần này cho chắc vậy thôi chứ thật ra k có vẫn tự disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const send = (event: FormEvent) => {
    event.preventDefault();

    setValue(""); //reset lại giá trị về rỗng

    setConversations((prev) => [
      ...prev,
      {
        content: value,
        isSender: true
      }
    ]);

    socket.emit("send_message", {
      content: value,
      to: "staff001"
    });
  };

  return (
    <div className="sticky bottom-0 px-5 flex py-5 justify-end items-end">
      {isOpen && (
        <div className="w-80 h-96 border border-red-500 mr-5 rounded-xl">
          <div className="w-full h-12 flex items-center justify-between bg-pink-400 rounded-t-xl">
            <h5 className="pl-3 text-medium text-white">Chat với nhân viên</h5>
            <button onClick={() => setIsOpen(false)} className="pr-3">
              <FaXmark className="text-lg text-white" />
            </button>
          </div>
          <div className="w-full h-72 flex-col bg-white px-2 overflow-auto pb-2">
            <p className="text-center py-3">Bạn cần hỗ trợ?</p>
            {conversations.map((conversation, index) => (
              <div key={index}>
                <Card
                  className={`max-w-[75%] mt-3 text-sm ${conversation.isSender && "ml-20 bg-blue-500"}`}
                >
                  <CardBody>
                    <p>{conversation.content}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
          <form
            onSubmit={send}
            className="w-full h-[46px] border-t-1 px-2 flex items-center border-slate-500 bg-white rounded-b-xl"
          >
            <input
              type="text"
              placeholder="Nhập nội dung..."
              className="w-full pl-3 outline-none"
              onChange={(event) => setValue(event.target.value)}
              value={value}
            />
            <button type="submit">
              <AiOutlineSend className="text-lg" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          user ? setIsOpen(!isOpen) : nav("/login");
        }}
      >
        <LuMessageCircle className="text-6xl border rounded-full bg-blue-500 p-2 text-white cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatButton;
