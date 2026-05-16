import { Button } from "@/components/ui/button";
import InfoStats from "./InfoStats";
import AppFeatures from "./AppFeatures";
import Footer from "./Footer";
import Nav from "@/components/common/Nav";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B1628]  pb-5">
      <Nav />
      <div className="max-w-7xl mx-auto lg:pt-[10vh] pt-[5vh]">
        <div className="lg:grid grid-cols-2 lg:gap-16 lg:items-center py-1 lg:pb-28 lg:pt-10 lg:px-20 px-4">
          <section className=" py-2 lg:py-0">
            <div
              className="flex justify-evenly md:justify-around  
            items-center text-[#C9A84C] p-2 md:p-1 border border-[rgb(93,80,49)] bg-[rgba(201,168,76,0.1)] max-w-[70%]  mx-3 my-5 md:mb-7 rounded-4xl text-[0.75rem] shadow-[0_0_40px_rgba(201,168,76,0.15)] md:max-w-[50%] md:mx-0"
            >
              <div className="w-2 h-2  rounded-[50%] bg-[#f59e0b] animate-pulse"></div>
              <p className=" text-xs">REAL-TIME TASK MANAGEMENT</p>
            </div>
            <h1 className="text-[2rem]  pr-10 text-white font-['Playfair_Display_Variable'] font-semibold lg:text-[4vw] md:text-[3.5rem]   md:leading-[1.2]  md:tracking-[-0.01em] md:mb-6 md:font-bold hidden lg:block">
              Work flows when tasks are <br />
              <span className="italic text-[#C9A84C] font-semibold">
                organised.
              </span>
            </h1>
            <h1 className="text-[2rem]  pr-10 text-white font-['Playfair_Display_Variable'] font-semibold lg:text-[4vw] md:text-[3.5rem]   md:leading-[1.2]  md:tracking-[-0.01em] md:mb-6 md:font-bold lg:hidden">
              Work flows when tasks are{" "}
              <span className="italic text-[#C9A84C] font-semibold">
                organised.
              </span>
            </h1>
            <p className="text-[#8A93A8] text-sm md:text-[0.9rem]">
              A clean, focused kanban board that keeps your work moving. Create
              tasks, set priorities, track progress - all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-7 mb-3">
              <Button
                type="button"
                variant="link"
                title="Start for free"
                className="bg-[#C9A84C] text-black rounded-sm p-6 w-full sm:w-auto sm:min-w-[10vw] hover:no-underline hover:cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Start for free
              </Button>
              <Button
                type="button"
                variant="default"
                title="Login"
                className="bg-transparent text-white rounded-sm p-6 border border-[#E2C47A] w-full sm:w-auto sm:min-w-[10vw] hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
            <p className=" text-[#8A93A8] text-xs">
              <span className="text-[#C9A84C] pr-2">✓</span>
              No credit card required. Free to use.
            </p>
          </section>
          <section className="bg-[#132040] px-7 py-5 my-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-transparent rounded-md md:max-h-[60vh] lg:max-h-none overflow-hidden">
            <section className="flex justify-between items-center pb-2">
              <p className="text-white text-[0.7rem] font-['Playfair_Display_Variable']">
                Product Roadmap
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-[50%] bg-[#ef4444]"></div>
                <div className="w-2 h-2  rounded-[50%]  bg-[#f59e0b]"></div>
                <div className="w-2 h-2  rounded-[50%] bg-[#22c55e] "></div>
              </div>
            </section>
            <hr />
            <section className="grid grid-cols-3 gap-3">
              <div className="bg-[#1E3160] my-4 text-[0.6rem] py-2 rounded-md">
                <div className="flex items-center justify-around pb-1">
                  <div className="w-2 h-2  rounded-[50%] bg-[#6b7280]"></div>
                  <p className="text-white ] ">Todo</p>
                </div>
                <div className="bg-[#0B1628] mx-2 border border-transparent rounded-sm p-2">
                  <p className="text-white">Design Onboarding flow</p>
                  <div className="bg-[#3e2424] text-[#f35e5e] flex justify-center mt-3">
                    High
                  </div>
                </div>
                <div className="bg-[#0B1628] mx-2 p-2 mt-3 border border-transparent rounded-sm">
                  <p className="text-white">API rate Limiting</p>
                  <div className="bg-[#5a4623] text-[#f6b443] flex justify-center mt-3">
                    Medium
                  </div>
                </div>
                <div className="border border-dashed border-[#303134] text-[#8A93A8] mx-2 p-2 mt-2">
                  + Add task
                </div>
              </div>
              <div className="bg-[#1E3160] my-4 text-[0.6rem] py-2 rounded-md">
                <div className="flex items-center justify-evenly pb-1">
                  <div className="w-2 h-2  rounded-[50%] bg-[#f59e0b]"></div>
                  <p className="text-white  text-nowrap ">IN PROGRESS</p>
                </div>
                <div className="bg-[#0B1628] mx-2 border border-transparent rounded-sm p-2">
                  <p className="text-white">AUTH middleware</p>
                  <div className="bg-[#3e2424] text-[#f35e5e] flex justify-center mt-3">
                    High
                  </div>
                </div>
                <div className="bg-[#0B1628] mx-2 p-2 mt-3 border border-transparent rounded-sm">
                  <p className="text-white ">Schema Design</p>
                  <div className="bg-[#5a4623] text-[#f6b443] flex justify-center mt-3">
                    Medium
                  </div>
                </div>
                <div className="border border-dashed border-[#303134] text-[#8A93A8] mx-2 p-2 mt-2">
                  + Add task
                </div>
              </div>
              <div className="bg-[#1E3160] my-4 text-[0.6rem] py-2 rounded-md">
                <div className="flex items-center justify-evenly pb-1">
                  <div className="w-2 h-2  rounded-[50%] bg-[#22c55e] "></div>
                  <p className="text-white">Done</p>
                </div>
                <div className="bg-[#0B1628] mx-2 border border-transparent rounded-sm p-2">
                  <p className="text-white">Server Design</p>
                  <div className="bg-[#072e16] text-[#22c55e] flex justify-center mt-3 items-center">
                    Low
                  </div>
                </div>
                <div className="bg-[#0B1628] mx-2 p-2 mt-3 border border-transparent rounded-sm">
                  <p className="text-white">Project Setup</p>
                  <div className="bg-[#072e16] text-[#22c55e] flex justify-center mt-3">
                    Low
                  </div>
                </div>
                <div className="border border-dashed border-[#303134] text-[#8A93A8] mx-2 p-2 mt-2">
                  + Add task
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
      <InfoStats />
      <AppFeatures />
      <Footer />
    </div>
  );
};

export default Landing;
