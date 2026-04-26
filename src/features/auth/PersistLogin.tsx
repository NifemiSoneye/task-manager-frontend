import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useNavigate } from "react-router-dom";

const PersistLogin = () => {
  const navigate = useNavigate();
  const [persist] = useLocalStorage<boolean>("persist", false);
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh(undefined);
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true });
    }
  }, [isError, navigate]);
  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    content = null;
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
