const AppFeatures = () => {
  return (
    <div className="mt-10 px-4 max-w-6xl mx-auto">
      <p className="text-[#C9A84C] uppercase text-xs mb-4">Why Taskflow</p>
      <p className="text-2xl mb-14 text-white font-['Playfair_Display_Variable'] md:text-4xl font-bold">
        Everything you need, <br /> nothing you don't.
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            ⚡
          </div>
          <h2 className="text-white font-semibold my-3">
            Real-time Collaboration
          </h2>
          <p className="text-[#8A93A8] text-xs">
            See changes instantly as they happen. No refreshing, no delays -
            your board stays in sync.
          </p>
        </div>
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🎯
          </div>
          <h2 className="text-white font-semibold my-3">Priority Tracking</h2>
          <p className="text-[#8A93A8] text-xs">
            Mark tasks as Low, Medium or High priority. Always know what needs
            your attention first.
          </p>
        </div>
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            📁
          </div>
          <h2 className="text-white font-semibold my-3">Multiple Boards</h2>
          <p className="text-[#8A93A8] text-xs">
            Organize different projects into separate boards. Keep your work
            contexts clean and separate.
          </p>
        </div>
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🖱️
          </div>
          <h2 className="text-white font-semibold my-3">Drag & Drop</h2>
          <p className="text-[#8A93A8] text-xs">
            Move tasks between columns with a natural drag and drop. Progress
            updates automatically.
          </p>
        </div>
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            📅
          </div>
          <h2 className="text-white font-semibold my-3">Due Dates</h2>
          <p className="text-[#8A93A8] text-xs">
            Set deadlines on tasks so nothing slips through the cracks. Stay
            ahead of your schedule.
          </p>
        </div>
        <div className="bg-[#132040] p-6 rounded-md">
          <div className="bg-[#23252b] w-11 h-11 flex items-center justify-center rounded-lg mb-4">
            🔒
          </div>
          <h2 className="text-white font-semibold my-3">Secure by Default</h2>
          <p className="text-[#8A93A8] text-xs">
            JWT authentication with refresh token rotation. Your data stays
            private and protected.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AppFeatures;
