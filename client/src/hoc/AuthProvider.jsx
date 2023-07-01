import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      console.log(token);
      const userData = await api
        .get("/user/v2", {
          params: { token },
        })
        .then((res) => res.data);
      console.log(userData);
      if (userData) {
        dispatch({
          type: "login",
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return children;
}
