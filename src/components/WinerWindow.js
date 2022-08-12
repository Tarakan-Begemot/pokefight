const WinerWindow = ({ winer }) => {
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="absolute mx-[630px] mt-[270px] overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-modal md:h-full ">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-amber-300 rounded-lg shadow border-4 border-black min-h-[400px]">
          <div className="p-6 space-y-6">
            <p className="leading-relaxed text-red-500 text-center text-5xl">You {winer}!</p>
            <p className="text-4xl leading-relaxed text-black-500 text-center">Your score: 300</p>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => window.location.reload()}>
              Go to Start Page
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
              onClick={() => window.location.reload()}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinerWindow;
