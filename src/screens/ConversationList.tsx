import React, { useEffect, useState } from "react";
import { ConversationClient } from "../clients/ConversationClient";
import { Loading } from "../components/Loading";
import { ErrorDisplay } from "../components/Error";
import { PageLayout } from "../components/layout/PageLayout";
import { format } from "date-fns";
import { PATHS } from "../lib/routes";
import { Link } from "react-router-dom";
import { ConversationListItem } from "../types/Conversation";
import { ConversationItem } from "../components/conversation/ConversationItem";

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

      // Sort the conversations by the latest message date
      const sorted = response.sort((a, b) => {
        return (
          new Date(b.messageDateTime).getTime() -
          new Date(a.messageDateTime).getTime()
        );
      });

      setConversations(sorted);
    } catch (err) {
      setError("An error has occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the list of conversations on load
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

  const conversationElements = conversations.map((conversation) => <ConversationItem conversation={conversation} />);

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
