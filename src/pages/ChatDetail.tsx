import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import PageHeader from "../layout/admin/PageHeader";
import { Card, CardBody } from "@nextui-org/react";
import { AiOutlineSend } from "react-icons/ai";
import { ConversationType } from "../layout/user/ChatButton";
import { getMessageByUser } from "../apis/user";
import { useAuth } from "../provider/AuthProvider";

const ChatDetail = () => {
  const user_id = useParams<{ user_id: string }>().user_id;
  const [value, setValue] = useState("");
  const { token } = useAuth();
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getMessageByUser({
          access_token: token.access_token as string,
          page: 1,
          user_id: user_id as string
        });
        if (res.status === 200) {
          const { chatLines } = res.data.result;
          setConversations(chatLines);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchConversations();

    socket.on("receive_message", (data) => {
      const { payload } = data;
      setConversations((prev) => [...prev, payload]);
    });

    //clean up function : khi component bị unmount thì sẽ disconnect| phần này cho chắc vậy thôi chứ thật ra k có vẫn tự disconnect
  }, []);

  const send = (event: FormEvent) => {
    event.preventDefault();

    const conversation = {
      sender_id: "staff001",
      receiver_id: user_id,
      content: value,
      sender: "STAFF"
    };

    setConversations((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        content: conversation.content,
        sender: conversation.sender as "MEMBER" | "STAFF",
        created_at: new Date().getTime()
      }
    ]);

    setValue(""); //reset lại giá trị về rỗng

    socket.emit("send_message", {
      payload: conversation
    });
  };

  return (
    <>
      <PageHeader title={`To ${user_id}`} />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                 lg:items-center lg:gap-4"
      >
        <div className="min-h-[70vh]">
          {conversations.map((conversation, index) => (
            <div key={index}>
              <Card
                className={`max-w-[75%] mt-3 text-sm ${conversation.sender === "STAFF" && "ml-20 bg-blue-500"}`}
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
    </>
  );
};

export default ChatDetail;
