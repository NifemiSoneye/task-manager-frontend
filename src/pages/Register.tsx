import { useState } from "react";
import { useRef } from "react";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%]{8,24}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
const Register = () => {
  const thisYear = new Date().getFullYear();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validEmail = EMAIL_REGEX.test(email);
  const validUsername = USERNAME_REGEX.test(username);
  const validPassword = PASSWORD_REGEX.test(password);
  const navigate = useNavigate();
  const passwordsMatch = password === confirmPassword;
  let canSubmit;
  if (validEmail && validPassword && validUsername && passwordsMatch) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, username]);

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await register({ email, username, password }).unwrap();
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: "User succesfully logged in",
      });
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username , Password , email");
      } else if (err.status === 409) {
        setErrMsg("Duplicate email");
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
  const handleConfirmPwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  return (
    <div className="bg-[#0B1628] min-h-screen  md:grid md:grid-cols-2">
      <div className="bg-[#132040] p-12 hidden md:flex flex-col md: justify-between ">
        <p className="text-white  text-2xl font-['Playfair_Display_Variable'] ">
          <span className="text-[#C9A84C] ">Task</span>
          Flow
        </p>

        <div>
          <p className="text-white font-['Playfair_Display_Variable'] text-[2rem] font-semibold leading-tight mb-6  ">
            Your work, <br />
            <span className="text-[#C9A84C] italic">finally organised.</span>
          </p>
          <p className="text-[#8A93A8] text-[0.8rem]  font-light leading-[1.7]">
            Create your free account and start managing your <br /> tasks the
            right way. Takes less than a minute.
          </p>

          <section className="mt-5 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-[50%] bg-[#2b2f37] flex justify-center text-[#C9A84C]">
                1
              </div>
              <div>
                <p className="text-white">Create your account</p>
                <p className="text-[#8A93A8] text-[0.8rem]">
                  Sign up with your email and a secure password
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-[50%] bg-[#2b2f37] flex justify-center text-[#C9A84C]">
                2
              </div>
              <div>
                <p className="text-white">Create your first board</p>
                <p className="text-[#8A93A8] text-[0.8rem]">
                  Give your project a name and get your board ready
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-[50%] bg-[#2b2f37] flex justify-center text-[#C9A84C]">
                3
              </div>
              <div>
                <p className="text-white">Add tasks and get moving</p>
                <p className="text-[#8A93A8] text-[0.8rem]">
                  Create tasks, set priorities , drag them to done
                </p>
              </div>
            </div>
          </section>
        </div>
        <p className="text-[0.78rem] text-[#8A93A8] items-baseline">
          &copy; {thisYear} Taskflow.
        </p>
      </div>
      <div className="p-4 md:flex md:flex-col justify-center items-center md:text-left md:p-12 opacity-0 animate-fade-up delay-150 ">
        <div className="lg:max-w-100 w-full">
          <p className="text-[#C9A84C] font-['Playfair_Display_Variable'] text-2xl my-3 md:hidden">
            TaskFlow
          </p>
          <p className="text-[#C9A84C] uppercase text-sm">Get started free</p>

          <p className="text-white font-['Playfair_Display_Variable'] text-3xl mt-2 font-semibold ">
            Create your account
          </p>

          <div className="mt-5">
            <div
              className={
                errMsg
                  ? "bg-red-200 px-4 py-2 my-2 rounded-lg  text-red-500"
                  : "hidden"
              }
              ref={errRef}
            >
              🚨 {errMsg}
            </div>
            <div className="flex justify-between mt-5">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <p
                className={
                  !validUsername && username.length > 0
                    ? "text-red-500 text-md font-semibold"
                    : "hidden"
                }
              >
                Enter a valid Username
              </p>
            </div>

            <Input
              name="username"
              type="text"
              placeholder="e.g. nifemi_dev"
              className={`w-full mt-3 rounded-sm p-5 text-white focus:outline-none ${
                !validUsername && username.length > 0
                  ? "border-red-600 focus:border-red-600"
                  : username.length === 0
                    ? "border-white/20"
                    : "border-green-500"
              }`}
              value={username}
              onChange={handleUserInput}
            />
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
                    ? "border-white/20"
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
                placeholder="Create a strong password"
                className={`w-full mt-3 rounded-sm p-5 text-white focus:outline-none ${
                  !validPassword && password.length > 0
                    ? "border-red-600 focus:border-red-600"
                    : password.length === 0
                      ? "border-white/20"
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
            <div className="flex justify-between mt-5">
              <Label htmlFor="confirm password" className="text-white ">
                Confirm Password
              </Label>
              <p
                className={
                  !passwordsMatch && confirmPassword.length > 0
                    ? "text-red-500 text-md font-semibold"
                    : "hidden"
                }
              >
                Passwords do not match
              </p>
            </div>
            <div className="relative">
              <Input
                name="confirm password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className={`w-full mt-3 rounded-sm p-5 text-white focus:outline-none ${
                  !passwordsMatch && confirmPassword.length > 0
                    ? "border-red-600 focus:border-red-600"
                    : confirmPassword.length === 0
                      ? "border-white/20"
                      : "border-green-500"
                }`}
                value={confirmPassword}
                onChange={handleConfirmPwdInput}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A8] hover:text-white mt-1.5"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button
            type="button"
            variant="default"
            title="Get started"
            className="bg-[#C9A84C] text-black w-full mt-5 rounded-sm p-5"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>

          <p className="text-[#8A93A8] text-center mt-3 text-sm">
            Already have an account
            <span className="text-[#C9A84C] hover:underline">
              <Link to="/login"> Sign in →</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
