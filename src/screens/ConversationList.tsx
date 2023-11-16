import React, { useEffect, useState } from "react";
import { ConversationClient } from "../clients/ConversationClient";
import { Loading } from "../components/Loading";
import { ErrorDisplay } from "../components/Error";
import { PageLayout } from "../components/layout/PageLayout";
import { format } from "date-fns";
import { PATHS } from "../lib/routes";
import { Link } from "react-router-dom";
import { ConversationListItem } from "../types/Conversation";

const useConversationList = () => {
  const [conversations, setConversations] = useState<ConversationListItem[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getConversations = async () => {
    // On initial fetch loading is set to true by default, so we ignore, but for a "refetch" we want to set loading to true.
    if (!loading) {
      setLoading(true);
    }

    try {
      const response = await ConversationClient.list();

      const sorted = response.sort((a, b) => {
        return (
          new Date(b.messageDateTime).getTime() -
          new Date(a.messageDateTime).getTime()
        );
      });

      setConversations(response);
    } catch (err) {
      setError("An error has occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return {
    conversations,
    loading,
    error,
    retry: getConversations,
  };
};

export const ConversationList = () => {
  const { conversations, loading, error, retry } = useConversationList();

  const conversationElements = conversations.map((conversation) => {
    const { id, firstName, lastName, message, messageDateTime, cleanerUnread } =
      conversation;

    const formattedDate = format(new Date(messageDateTime), "MMM dd yyyy");

    return (
      <li key={id} className="flex justify-between gap-x-6 py-5">
        <div className="flex grow justify-between">
          <div className="flex">
            {cleanerUnread ? (
              <span className="mt-auto mb-auto h-4 w-4 rounded-full bg-green-200 mr-4" />
            ) : null}
            <img
              className="h-24 w-24 rounded-md bg-gray-50"
              src="https://placehold.co/128x128"
              alt="customer profile picture"
            />
          </div>
          <div className="flex flex-col ml-8 mr-8">
            <p className="font-semibold leading-6 text-gray-900">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-gray-900">{formattedDate}</p>
            <p className="text-sm mt-2">{message}</p>
          </div>
          <div className="ml-auto shrink-0 self-center">
            <Link
              to={`${PATHS.conversation}/${id}`}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Conversation
            </Link>
          </div>
        </div>
      </li>
    );
  });

  return (
    <PageLayout title="Conversations">
      {error ? <ErrorDisplay retryFunc={retry}>{error}</ErrorDisplay> : null}
      {loading ? <Loading /> : null}
      {conversations.length > 0 ? (
        <ul className="divide-y divide-gray-100">{conversationElements}</ul>
      ) : null}
    </PageLayout>
  );
};
