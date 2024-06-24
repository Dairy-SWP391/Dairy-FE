import { useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import { Card, CardBody } from "@nextui-org/react";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
            <Card className="max-w-[75%] text-sm">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
            <Card className="ml-20 max-w-[75%] text-sm mt-3 bg-blue-500 ">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
            <Card className="ml-20 max-w-[75%] text-sm mt-3 bg-blue-500 ">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
            <Card className="max-w-[75%] text-sm mt-3">
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
          </div>
          <div className="w-full h-[46px] border-t-1 px-2 flex items-center border-slate-500 bg-white rounded-b-xl">
            <input
              type="text"
              placeholder="Nhập nội dung..."
              className="w-full pl-3 outline-none"
            />
            <button>
              <AiOutlineSend className="text-lg" />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)}>
        <LuMessageCircle className="text-6xl border rounded-full bg-blue-500 p-2 text-white cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatButton;
