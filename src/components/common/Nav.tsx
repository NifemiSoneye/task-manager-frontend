import React from "react";
import { Button } from "../ui/button";
const Nav = () => {
  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md z-50">
      <section className="bg-[#0B1628]/60 flex justify-between items-center p-3 md:p-5 border-b border-b-[#292c33]">
        <p className="text-white  text-2xl font-['Playfair_Display_Variable'] ">
          <span className="text-[#C9A84C] ">Task</span>
          Flow
        </p>
        <Button
          type="button"
          variant="default"
          title="Get started"
          className="bg-[#C9A84C] text-black"
        >
          Get started
        </Button>
      </section>
    </div>
  );
};

export default Nav;
