import { useState } from "react";
import { useRef } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
  const ref = useRef(null);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%]{8,24}$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [persist, setPersist] = useLocalStorage<boolean>("persist", false);
  const validEmail = EMAIL_REGEX.test(email);
  const validPassword = PASSWORD_REGEX.test(password);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let canSubmit;
  if (validEmail && validPassword) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/admin");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef?.current?.focus();
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  return (
    <div className="bg-[#0B1628] min-h-screen p-4">
      <p className="text-[#C9A84C] font-['Playfair_Display_Variable'] text-2xl my-3">
        TaskFlow
      </p>
      <p className="text-[#C9A84C] uppercase">Welcome Back</p>

      <p className="text-white font-['Playfair_Display_Variable'] text-3xl mt-2 ">
        Sign in to TaskFlow
      </p>
      <p className="text-[#8A93A8] text-sm mt-2">
        Don't have an account?{" "}
        <span className="text-[#C9A84C]">Create one for free</span>
      </p>
    </div>
  );
};

export default Login;
