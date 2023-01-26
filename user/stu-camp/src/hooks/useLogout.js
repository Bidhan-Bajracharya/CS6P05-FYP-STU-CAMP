import axios from "../api/axios";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import {
  setNotifications,
  setUnreadNotifications,
} from "../features/notificationSlice";

const useLogout = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  const logout = async () => {
    // removing our auth state
    setAuth({});
    dispatch(setNotifications([]));
    dispatch(setUnreadNotifications([]));
    
    try {
        await axios.get("/logout", {
            // sending secure cookie
            withCredentials: true,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
