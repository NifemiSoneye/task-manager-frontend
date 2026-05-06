import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  UserInfo: {
    id: string;
    email: string;
    username: string;
  };
}

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode<DecodedToken>(token);
    const { id, email, username } = decoded.UserInfo;
    return { id, email, username, token };
  }

  return { id: null, email: null, token: null };
};

export default useAuth;
