import { useState } from "react";
import { useRef } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const ref = useRef(null);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%]{8,24}$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = useLocalStorage<boolean>("persist", false);
  const [showPassword, setShowPassword] = useState(false);
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
      navigate("/dashboard");
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
  return (
    <div className="bg-[#0B1628] min-h-screen  lg:grid lg:grid-cols-2">
      <div className="bg-[#132040] p-5">
        <p className="text-white  text-2xl font-['Playfair_Display_Variable'] ">
          <span className="text-[#C9A84C] ">Task</span>
          Flow
        </p>

        <div>
          <p className="text-white font-['Playfair_Display_Variable']">
            Clarity starts with{" "}
            <span className="text-[#C9A84C] italic">organized work</span>
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#C9A84C] font-['Playfair_Display_Variable'] text-2xl my-3">
          TaskFlow
        </p>
        <p className="text-[#C9A84C] uppercase">Welcome Back</p>

        <p className="text-white font-['Playfair_Display_Variable'] text-3xl mt-2 ">
          Sign in to TaskFlow
        </p>
        <p className="text-[#8A93A8] text-sm mt-2">
          Don't have an account?{" "}
          <span className="text-[#C9A84C]">
            <Link to="/register">Create one free</Link>
          </span>
        </p>
        <div className="mt-10">
          <div
            className={
              errMsg
                ? "bg-red-200 px-4 py-2 my-2 rounded-lg  text-red-500"
                : "hidden"
            }
            ref={errRef}
          >
            "🚨" {errMsg}
          </div>
          <div className="flex justify-between mt-5">
            <Label htmlFor="email" className="text-white">
              Email address
            </Label>
            <p
              className={
                !validEmail && email.length > 0
                  ? "text-red-500 text-md font-semibold"
                  : "hidden"
              }
            >
              Enter a valid Email
            </p>
          </div>

          <Input
            name="email"
            type="text"
            placeholder="you@example.com"
            className={`w-full mt-3 rounded-sm p-5 text-white focus:outline-none ${
              !validEmail && email.length > 0
                ? "border-red-600 focus:border-red-600"
                : email.length === 0
                  ? "border-white"
                  : "border-green-500"
            }`}
            value={email}
            onChange={handleEmailInput}
          />
          <div className="flex justify-between mt-5">
            <Label htmlFor="password" className="text-white ">
              Password
            </Label>
            <p
              className={
                !validPassword && password.length > 0
                  ? "text-red-500 text-md font-semibold"
                  : "hidden"
              }
            >
              Enter a valid Password
            </p>
          </div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full mt-3 rounded-sm p-5 text-white focus:outline-none ${
                !validPassword && password.length > 0
                  ? "border-red-600 focus:border-red-600"
                  : password.length === 0
                    ? "border-white"
                    : "border-green-500"
              }`}
              value={password}
              onChange={handlePwdInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A8] hover:text-white mt-1.5"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Checkbox
            id="persist"
            checked={persist}
            onCheckedChange={(checked) => setPersist(checked as boolean)}
            className="bg-white text-black"
          />
          <p className="text-[#8A93A8]">Keep me signed in</p>
        </div>
        <Button
          type="button"
          variant="default"
          title="Get started"
          className="bg-[#C9A84C] text-black w-full mt-5 rounded-sm p-5"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
        </Button>

        <p className="text-[#8A93A8] text-center mt-3">
          New to TaskFlow?{" "}
          <span className="text-[#C9A84C] ">
            <Link to="/register">Create a free account</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
