import React, { useEffect, useState } from "react";

const RangeSlider = ({
  totalSpreads,
  currentSpread,
  spreads,
  flipbookInstance,
}) => {
  // Function to find the index of the current spread
  const findCurrentSpreadIndex = () => {
    for (let i = 0; i < spreads.length; i++) {
      const spread = spreads[i];

      // Check current spread and send the index +1
      if (
        currentSpread.includes(spread[0] + 1) &&
        (spread.length === 1 || currentSpread.includes(spread[1] + 1))
      ) {
        //add 1 because arrays are 0 indexed and want the value to start from 1
        return i + 1;
      }
    }
    return -1;
  };

  // state of current index of the spread
  const [currentValue, setCurrentValue] = useState(findCurrentSpreadIndex());
  // Update current index value when currentSpread changes
  useEffect(() => {
    setCurrentValue(findCurrentSpreadIndex());
  }, [currentSpread]);


  // Handle using the slider
  const handleChange = (e) => {
    //update slider value
    const value = parseInt(e.target.value);
    setCurrentValue(value);

    //get target page and change Flipbook page
    const targetPage = spreads[e.target.value - 1][0];
    if (flipbookInstance) {
      flipbookInstance.paging.goToPage(targetPage + 1);
    }
  };



  return (
    <div className="h-10 w-[calc(100%-4rem)] md:w-[calc(100%-16rem)] mx-6 hidden md:flex items-center justify-center relative">
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer relative z-10"
        value={currentValue}
        min="1"
        max={totalSpreads}
        onChange={handleChange}
      />

      {/* Custom slider handle */}
      <div
        className="z-20 absolute w-12 h-6 top-2 rounded bg-gray-400 -translate-x-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: `${((currentValue - 1) * 100) / (totalSpreads - 1)}%` }}
      >
        <p className="text-white text-[.6rem]">
          {/* display current page (single value or 2 separated by a "/" symbol) */}
          {currentSpread.length === 1
            ? currentSpread[0]
            : `${currentSpread[0]} / ${currentSpread[1]}`}
        </p>
      </div>

    </div>
  );
};

export default RangeSlider;
