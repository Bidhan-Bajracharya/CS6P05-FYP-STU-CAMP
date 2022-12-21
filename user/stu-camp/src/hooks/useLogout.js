import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    // removing our auth state
    setAuth({});
    
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
