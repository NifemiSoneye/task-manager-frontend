import { Button } from "@/components/ui/button";
const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1628] px-4">
      <section className="bg-[#0B1628] flex justify-between items-center p-3">
        <p className="text-white ">
          <span className="text-[#C9A84C]">Task</span>
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
      <hr />
      <p className="text-[#C9A84C] p-4 border border-[#E2C47A] bg-transparent max-w-[70%] m-5 rounded-4xl text-[0.75rem]">
        REAL-TIME TASK MANAGEMENT
      </p>
      <h1 className="text-[2rem]  pr-10 text-white">
        Work flows when tasks are{" "}
        <span className="italic text-[#C9A84C]">organised</span>
      </h1>
      <p className="text-[#8A93A8]">
        A clean, focused kanban board that keeps your work movng. Create tasks,
        set priorities, track progress - all in one place
      </p>
      <div className="flex flex-col gap-4 mt-7 mb-3">
        <Button
          type="button"
          variant="link"
          title="Reset"
          className="bg-[#C9A84C] text-black rounded-sm p-6"
        >
          Start for free
        </Button>
        <Button
          type="button"
          variant="default"
          title="Reset"
          className="bg-transparent text-white rounded-sm p-6 border border-[#E2C47A] "
        >
          See how it works
        </Button>
      </div>
      <p className=" text-[#8A93A8]">
        <span className="text-[#C9A84C] pr-2">✓</span>
        No credit card required. Free to use.
      </p>

      <section className="bg-[#132040] px-7">
        <div className="flex justify-between items-center">
          <p className="text-white">Product Roadmap</p>
          <div className="flex gap-1">
            <div className="w-2 h-2 border rounded-[50%] bg-[#ef4444]"></div>
            <div className="w-2 h-2 border rounded-[50%] bg-[#f59e0b]"></div>
            <div className="w-2 h-2 border rounded-[50%] bg-[#22c55e]"></div>
          </div>
        </div>
        <hr />
      </section>
    </div>
  );
};

export default Landing;
