import React from "react";

const PagesGrid = ({
  baseURL,
  showGrid,
  setShowGrid,
  totalPages,
  flipbookInstance,
}) => {
  //convert pages to array to map
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  //page button: hides grid + uses flipbook instance to go to desired page
  const PageButton = (page) => {
    setShowGrid(false);
    if (flipbookInstance) {
      flipbookInstance.paging.goToPage(page);
    }
  };

  return (
    <div
      className={`absolute w-full h-full overflow-y-auto bg-white ${
        showGrid ? "opacity-100" : "opacity-0 invisible"
      } grid gap-8 p-3 md:gap-14 md:p-5 grid-flow-row auto-rows-min  grid-cols-[repeat(auto-fill,_minmax(125px,_1fr))]`}
      style={{
        transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* map through pages and create buttons */}
      {pages.map((page) => (
        <button
          className="group w-full flex flex-col justify-center items-center"
          key={page}
          onClick={() => PageButton(page)}
        >
          <div className="w-full relative">
            <div
              className="w-full h-full absolute bg-black opacity-0 group-hover:opacity-30"
              style={{
                transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <img
              src={`${baseURL}Image.ashx?PageNumber=${page}&ImageType=Normal `}
              className="w-full h-auto"
              alt={`Page ${page}`}
            />
          </div>
          <div
            className="bg-gray-200 group-hover:bg-gray-400 flex justify-center items-center w-12 rounded-ee-sm rounded-es-sm"
            style={{
              transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <p className="text-sm">{page}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PagesGrid;
