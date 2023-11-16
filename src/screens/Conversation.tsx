import React, { useEffect, useState } from "react";
import { ConversationClient } from "../clients/ConversationClient";
import { Loading } from "../components/Loading";
import { ErrorDisplay } from "../components/Error";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import classNames from "classnames";
import { MessageInput } from "../components/forms/MessageInput";
import { useAuth } from "../lib/auth/AuthContext";
import { format } from "date-fns";
import { UserType } from "../types/common";
import {
  Message,
  Conversation as ConversationType,
} from "../types/Conversation";

const useConversation = () => {
  const [conversation, setConversation] = useState<ConversationType>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { conversationId } = useParams();

  const getConversation = async () => {
    // On initial fetch loading is set to true by default, so we ignore, but for a "refetch" we want to set loading to true.
    if (!loading) {
      setLoading(true);
    }

    try {
      const response = await ConversationClient.conversation(
        conversationId || ""
      );

      setConversation(response);
    } catch (err) {
      setError("An error has occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await ConversationClient.sendMessage(
        message,
        conversationId || ""
      );

      if (!conversation) {
        return;
      }

      const existingMessages = conversation.messages;
      const newConversation: ConversationType = {
        ...conversation,
        messages: [response, ...existingMessages],
      };
      setConversation(newConversation);
    } catch (err) {
      console.log(err);
    }
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return {
    retry: getConversation,
    conversation,
    loading,
    error,
    message,
    sendMessage,
    onMessageChange,
  };
};

export const Conversation = () => {
  const {
    conversation,
    loading,
    error,
    retry,
    message,
    onMessageChange,
    sendMessage,
  } = useConversation();
  const { userinfo } = useAuth();

  const renderMessage = (message: string) => {
    if (message.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)) {
      return <img className="h-64" src={message} />;
    } else {
      return message;
    }
  };

  const messages = conversation?.messages ?? [];
  const messageElements = messages.map((messageItem: Message) => {
    const { message, sourceEnum, messageDateTime } = messageItem;
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
          {renderMessage(message)}
        </div>
        <p className="text-sm ml-auto text-gray-800">
          {format(new Date(messageDateTime), "PPPp")}
        </p>
      </li>
    );
  });

  return (
    <PageLayout title="Conversation">
      {error ? <ErrorDisplay retryFunc={retry}>{error}</ErrorDisplay> : null}
      {loading ? <Loading /> : null}
      {messages.length > 0 && !loading ? (
        <div>
          <ul className="flex flex-col-reverse max-h-128 bg-slate-50 overflow-scroll">
            {messageElements}
          </ul>
          <form onSubmit={sendMessage} className="flex">
            <div className="flex-1">
              <MessageInput value={message} onChange={onMessageChange} />
            </div>
            <button
              type="submit"
              className="w-24 ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </PageLayout>
  );
};
