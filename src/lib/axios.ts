import axios from "axios";

const instance = axios.create({
  baseURL: "https://homeaglow-staging.herokuapp.com/api",
});

export default instance;
