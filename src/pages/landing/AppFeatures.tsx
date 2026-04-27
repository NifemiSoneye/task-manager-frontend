const AppFeatures = () => {
  return (
    <div className="h-full mt-10 px-4">
      <p className="text-[#C9A84C] uppercase text-xs mb-4">Why Taskflow</p>
      <p className="text-2xl mb-14 text-white font-['Playfair_Display_Variable']">
        Everything you need, nothing you don't.
      </p>
      <section className="grid grid-cols-1 gap-4">
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            ⚡
          </div>
          <h2 className="text-white font-semibold my-3">
            Real-time Collaboration
          </h2>
          <p className="text-[#8A93A8] text-sm">
            See changes instantly as they happen. No refreshing no delays - your
            board stays in sync
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🎯
          </div>
          <h2 className="text-white font-semibold my-3">Priority Tracking</h2>
          <p className="text-[#8A93A8] text-sm">
            Mark tasks as Low, Medium or High priority.Always know what needs
            your attention first.
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            📁
          </div>
          <h2 className="text-white font-semibold my-3">Multiple Boards</h2>
          <p className="text-[#8A93A8] text-sm">
            Organize different projects into separate boards. Keep your work
            contexts clean and seperate
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🖱️
          </div>
          <h2 className="text-white font-semibold my-3">Drag & Drop</h2>
          <p className="text-[#8A93A8] text-sm">
            Move tasks between columns with a natural drag and drop. Progress
            updates automatically.
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            📅
          </div>
          <h2 className="text-white font-semibold my-3">Due Dates</h2>
          <p className="text-[#8A93A8] text-sm">
            Set deadlines on tasks so nothing slips through the cracks . Stay
            ahead of your schedule.
          </p>
        </div>
        <div className="bg-[#132040] p-4 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🔒
          </div>
          <h2 className="text-white font-semibold my-3">Secure by Default</h2>
          <p className="text-[#8A93A8] text-sm">
            JWT authentication with refresh token rotation. Your data stays
            private and protected
          </p>
        </div>
      </section>
    </div>
  );
};

export default AppFeatures;
