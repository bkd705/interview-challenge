import axios from "../axios";

const AUTH_STORAGE_KEYS = {
  access: "access_token",
  refresh: "refresh_token",
};

export const handleTokens = (access: string, refresh: string) => {
  localStorage.setItem(AUTH_STORAGE_KEYS.access, access);
  localStorage.setItem(AUTH_STORAGE_KEYS.refresh, refresh);

  initAuth();
};

export const clearTokens = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.access);
  localStorage.removeItem(AUTH_STORAGE_KEYS.refresh);

  axios.defaults.headers.common.Authorization = "";
};

export const getTokens = () => {
  const access = localStorage.getItem(AUTH_STORAGE_KEYS.access);
  const refresh = localStorage.getItem(AUTH_STORAGE_KEYS.refresh);

  return {
    access,
    refresh,
  };
};

export const tokensCheck = () => {
  const access = localStorage.getItem(AUTH_STORAGE_KEYS.access);
  const refresh = localStorage.getItem(AUTH_STORAGE_KEYS.refresh);

  return Boolean(access && refresh);
};

export const initAuth = () => {
  const access = localStorage.getItem(AUTH_STORAGE_KEYS.access);

  axios.defaults.headers.common.Authorization = `Bearer ${access}`;
};
