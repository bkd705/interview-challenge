import axios from "../lib/axios";
import {
  ConversationListItem,
  Conversation,
  Message,
} from "../types/Conversation";

interface ListResponse extends Array<ConversationListItem> {}

interface ConversationResponse extends Conversation {}

interface SendMessageResponse extends Message {}

const ENDPOINTS = {
  list: "/cp/conversations",
  conversation: "/cp/messages",
};

export const ConversationClient = {
  list: async (): Promise<ListResponse> => {
    const response = await axios.get(ENDPOINTS.list);

    return response.data.map((item: ConversationListItem) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      message: item.message,
      cleanerUnread: item.cleanerUnread,
      messageDateTime: item.messageDateTime,
      isActive: item.isActive,
      nextOrLastJobStart: item.nextOrLastJobStart,
    }));
  },
  conversation: async (customerId: string): Promise<ConversationResponse> => {
    const response = await axios.get(`${ENDPOINTS.conversation}/${customerId}`);

    return {
      next: response.data.next,
      previous: response.data.previous,
      messages: response.data.messages,
      customerID: response.data.customerID,
      lastWeekMessageCount: response.data.lastWeekMessageCount,
      nextOrLastJobId: response.data.nextOrLastJobId,
      nextOrLastJobStart: response.data.nextOrLastJobStart,
      proxyPhoneNumber: response.data.proxyPhoneNumber,
    };
  },
  sendMessage: async (
    message: string,
    customerId: string
  ): Promise<SendMessageResponse> => {
    const response = await axios.post(
      `${ENDPOINTS.conversation}/${customerId}`,
      { message }
    );

    return {
      id: response.data.id,
      sourceEnum: response.data.sourceEnum,
      recipientEnum: response.data.recipientEnum,
      channel: response.data.channel,
      message: response.data.message,
      customerID: response.data.customerID,
      cleanerID: response.data.cleanerID,
      messageDateTime: response.data.messageDateTime,
      cleanerUnread: response.data.cleanerUnread,
      template_name: response.data.template_name,
      adminUnread: response.data.adminUnread,
    };
  },
};
