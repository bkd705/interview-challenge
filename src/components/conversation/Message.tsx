import React from "react";
import { Message as MessageType } from "../../types/Conversation";
import { UserType } from "../../types/common";
import classNames from "classnames";
import { format } from "date-fns";
import { useAuth } from "../../lib/auth/AuthContext";

interface MessageProps {
  message: MessageType;
}

const renderMessage = (message: string) => {
  if (!message) return message;

  if (message.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)) {
    return <img className="h-64" src={message} />;
  } else {
    return message;
  }
};

export const Message = ({ message }: MessageProps) => {
  const { userinfo } = useAuth();

  const { message: messageContent, sourceEnum, messageDateTime } = message;
  const isMe = sourceEnum === UserType.CleaningProfessional;

  return (
    <li
      className={classNames(
        "flex flex-col justify-between gap-x-6 m-5 rounded-md",
        {
          "ml-32": isMe,
          "mr-32": !isMe,
        }
      )}
    >
      <p className="font-semibold leading-6 text-gray-900">
        {isMe ? userinfo?.first_name : "Customer"}
      </p>
      <div
        className={classNames("rounded-md bg-slate-100 my-1 p-3", {
          "bg-blue-100": isMe,
          "bg-slate-100": !isMe,
        })}
      >
        {renderMessage(messageContent)}
      </div>
      <p className="text-sm ml-auto text-gray-800">
        {format(new Date(messageDateTime), "PPPp")}
      </p>
    </li>
  );
};
