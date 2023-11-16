import React, { useEffect, useState } from "react";
import { ConversationClient } from "../clients/ConversationClient";
import { Loading } from "../components/Loading";
import { ErrorDisplay } from "../components/Error";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { MessageInput } from "../components/forms/MessageInput";
import {
  Message as MessageType,
  Conversation as ConversationType,
} from "../types/Conversation";
import { Button } from "../components/ui/Button";
import { Message } from "../components/conversation/Message";

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

  // Fetch the conversation on component load
  useEffect(() => {
    getConversation();
  }, []);

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

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

      // Append the message to the existing messages in memory
      // This is faster than making a new fetch for the entire conversation
      // But has the potential downside if the message fails to send on the server side then we'd be out of sync
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

  const messages = conversation?.messages ?? [];
  const messageElements = messages.map((messageItem: MessageType) => <Message message={messageItem} />);

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
            <Button
              type="submit"
              className="w-24 ml-2"
            >
              Send
            </Button>
          </form>
        </div>
      ) : null}
    </PageLayout>
  );
};
