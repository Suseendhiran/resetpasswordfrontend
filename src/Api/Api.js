import axios from "axios";

export default axios.create({
  baseURL: "https://resetpassword9.herokuapp.com/",
  responseType: "json",
  headers: { Authorization: localStorage.getItem("token") },
});
