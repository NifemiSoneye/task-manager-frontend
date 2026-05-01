const InfoStats = () => {
  return (
    <div className="bg-[#0f1b31] h-full p-8 border-b border-t border-b-gray-500 border-t-gray-500">
      <section className="grid grid-cols-2 gap-6 md:flex justify-between md:gap-0 md:mx-40  ">
        <div className="md:flex  justify-around items-center w-full">
          <div className="flex flex-col items-center my-3 ">
            <p className="text-[#C9A84C] text-3xl text font-bold font-['Playfair_Display_Variable']">
              3
            </p>
            <p className="text-sm text-[#8A93A8] uppercase">Visual Columns</p>
          </div>
          <div className="flex flex-col items-center my-3">
            <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
              Live
            </p>
            <p className="text-sm text-[#8A93A8] uppercase">
              Real-Time Updates
            </p>
          </div>
        </div>
        <div className="md:flex  justify-around items-center w-full">
          <div className="flex flex-col items-center my-3 ">
            <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
              ∞
            </p>
            <p className="text-sm text-[#8A93A8] uppercase">Boards & Tasks</p>
          </div>
          <div className="flex flex-col items-center my-3">
            <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
              0ms
            </p>
            <p className="text-sm text-[#8A93A8] uppercase">Drag & Drop Lag</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoStats;
