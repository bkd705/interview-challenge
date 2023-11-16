import axios from "../lib/axios";
import { UserInfo } from "../types/Auth";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
}

interface UserInfoResponse extends UserInfo {}

const ENDPOINTS = {
  login: "/token",
  refresh: "/token/refresh",
  profile: "/userinfo",
};

export const AuthClient = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(ENDPOINTS.login, { username, password });

    return {
      access: response.data.access,
      refresh: response.data.refresh,
    };
  },
  refreshToken: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await axios.post(ENDPOINTS.refresh, {
      refresh: refreshToken,
    });

    return {
      access: response.data.access,
    };
  },
  userinfo: async (): Promise<UserInfoResponse> => {
    const response = await axios.get(ENDPOINTS.profile);

    return {
      user_type: response.data.user_type,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      phone: response.data.phone,
      timezone: response.data.timezone,
      customerlocation: response.data.customerlocation,
    };
  },
};
