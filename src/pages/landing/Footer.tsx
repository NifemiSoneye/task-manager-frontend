import { Button } from "@/components/ui/button";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <>
      <div className="text-center pt-24 px-4 relative">
        {/* glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-37.5 bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />

        <h2 className="text-[2rem] text-white my-4 relative font-['Playfair_Display_Variable'] md:text-[2.5rem] font-bold">
          Ready to get things{" "}
          <span className="text-[#C9A84C] italic font-semibold">done?</span>
        </h2>
        <p className="text-[#8A93A8] text-[0.9rem] relative">
          Join TaskFlow and bring clarity to your work. Free to start, no setup
          required.
        </p>
        <Button
          type="button"
          className="bg-[#C9A84C] text-black p-6 my-6 rounded-sm w-full relative md:w-auto transition-all duration-300  hover:border-[#E2C47A] hover:bg-[#E2C47A] hover:shadow-[0_0_10px_rgba(226,196,122,1.0)] transform hover:-translate-y-px"
        >
          Create your account
        </Button>
      </div>
      <div className="mt-10 border-t border-t-gray-500 pt-6 px-4 sm:p-6 text-center sm:flex justify-between items-center">
        <p className="text-[#C9A84C] font-['Playfair_Display_Variable'] ">
          TaskFlow
        </p>
        <p className=" text-[0.78rem] text-[#8A93A8]">
          &copy; {thisYear} Taskflow. Built with precision{" "}
        </p>
      </div>
    </>
  );
};

export default Footer;
