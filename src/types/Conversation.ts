import { UserType, ChannelType } from "./common";

export interface Message {
  id: number;
  sourceEnum: UserType;
  recipientEnum: UserType;
  channel: ChannelType;
  message: string;
  customerID: number;
  cleanerID: number;
  messageDateTime: string;
  cleanerUnread: boolean;
  template_name: string;
  adminUnread: boolean;
}

export interface ConversationListItem {
  id: number;
  firstName: string;
  lastName: string;
  message: string;
  cleanerUnread: boolean;
  messageDateTime: string;
  isActive: boolean;
  nextOrLastJobStart: string;
}

export interface Conversation {
  next: any;
  previous: any;
  messages: Message[];
  customerID: string;
  lastWeekMessageCount: number;
  nextOrLastJobId: number;
  nextOrLastJobStart: string;
  proxyPhoneNumber: string;
}
