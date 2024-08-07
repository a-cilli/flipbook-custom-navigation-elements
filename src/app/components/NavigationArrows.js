import React from "react";

//destructure flipbook instance + number of pages (expressed as last page)
const NavigationArrows = ({ lastPage, flipbookInstance }) => {
  //create functions to navigate to first/prev/next/last pages
  const goToFirstPage = () => {
    if (flipbookInstance) {
      flipbookInstance.paging.goToPage(1);
    }
  };
  const goToPrevPage = () => {
    if (flipbookInstance) {
      flipbookInstance.paging.goToPrevPage();
    }
  };
  const goToNextPage = () => {
    if (flipbookInstance) {
      flipbookInstance.paging.goToNextPage();
    }
  };
  const goToLastPage = () => {
    if (flipbookInstance) {
      flipbookInstance.paging.goToPage(lastPage);
    }
  };

  //create component for button to be reused
  const CustomButton = ({ fn, children }) => {
    return (
      <button
        onClick={() => {
          fn();
        }}
        className="mx-4 flex justify-center items-center bg-gray-200 rounded-full h-8 w-10 relative"
      >
        {children}
      </button>
    );
  };

  return (
    //create 4 buttons and pass navigation functions
    <div className="w-full h-full flex justify-center items-center">
      <CustomButton fn={goToFirstPage}>
        <img src="/images/arrow-last.svg" className="w-8 h-8 rotate-180" />
      </CustomButton>
      <CustomButton fn={goToPrevPage}>
        <img src="/images/arrow.svg" className="w-8 h-8 rotate-180 mr-1" />
      </CustomButton>
      <CustomButton fn={goToNextPage}>
        <img src="/images/arrow.svg" className="w-8 h-8 ml-1" />
      </CustomButton>
      <CustomButton fn={goToLastPage}>
        <img src="/images/arrow-last.svg" className="w-8 h-8" />
      </CustomButton>
    </div>
  );
};

export default NavigationArrows;
