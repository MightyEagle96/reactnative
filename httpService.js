import axios from "axios";

const httpService = axios.create({
  baseURL: "http://192.168.16.82:3456/",
  timeout: 15000,
  withCredentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await httpService.post("auth/refreshtoken", {
        id: loggedInUser._id,
      });
      return httpService(error.config);
    }

    if (error.response)
      return { error: error.response.data, status: error.response.status };
    return { error: "Lost connection to the server" };
  }
);
const logout = async () => {
  const res = await httpService.get("logout");
  if (res) {
    localStorage.removeItem(process.env.REACT_APP_PROJECT_USER);
    window.location.assign("/");
  }
};
export { httpService, logout };
