import { UserType } from "./common";

export interface UserInfo {
  user_type: UserType;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  timezone: string;
  customerlocation: string;
}
