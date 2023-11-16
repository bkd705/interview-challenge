import React from "react";
import { ConversationListItem } from "../../types/Conversation";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { PATHS } from "../../lib/routes";

interface ConversationItemProps {
  conversation: ConversationListItem;
}

export const ConversationItem = ({ conversation }: ConversationItemProps) => {
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
};
