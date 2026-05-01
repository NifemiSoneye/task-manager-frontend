const InfoStats = () => {
  return (
    <div className="bg-[#0f1b31] p-8 border-b border-t border-gray-500">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
            3
          </p>
          <p className="text-sm text-[#8A93A8] uppercase">Visual Columns</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
            Live
          </p>
          <p className="text-sm text-[#8A93A8] uppercase">Real-Time Updates</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
            ∞
          </p>
          <p className="text-sm text-[#8A93A8] uppercase">Boards & Tasks</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#C9A84C] text-3xl font-bold font-['Playfair_Display_Variable']">
            0ms
          </p>
          <p className="text-sm text-[#8A93A8] uppercase">Drag & Drop Lag</p>
        </div>
      </section>
    </div>
  );
};

export default InfoStats;
