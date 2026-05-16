import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md z-50">
      <section className="bg-[#0B1628]/60 flex justify-between items-center p-3 md:p-5 border-b border-b-[#292c33] lg:px-15">
        <p className="text-white  text-2xl font-['Playfair_Display_Variable'] ">
          <span className="text-[#C9A84C] ">Task</span>
          Flow
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="default"
            title="Get started"
            className="  hidden lg:block bg-transparent border-[#292c33] text-white rounded-sm px-5 sm:max-w-[10vw] cursor-pointer hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant="default"
            title="Get started"
            className="bg-[#C9A84C] text-black rounded-sm transition-all duration-300 sm:max-w-[10vw] px-5  hover:border-[#E2C47A] hover:bg-[#E2C47A] hover:shadow-[0_0_10px_rgba(226,196,122,1.0)] transform hover:-translate-y-px"
            onClick={() => navigate("/register")}
          >
            Get started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Nav;
