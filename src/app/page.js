"use client";
import { useEffect, useState, useRef } from "react";
import ToggleGridBtn from "./components/NavigationGrid/ToggleGridBtn";
import PagesGrid from "./components/NavigationGrid/PagesGrid";
import RangeSlider from "./components/RangeSlider";
import NavigationArrows from "./components/NavigationArrows";

export default function Home() {
  // toggle grid state
  const [showGrid, setShowGrid] = useState(false);

  // pages object
  const [pagesObject, setPagesObject] = useState({
    startsWithSpread: false,
    currentSpread: 0,
    totalPages: 0,
    spreads: [],
  });

  // Ref to hold flipbook instance
  const flipbookInstanceRef = useRef(null);

  const baseURL = "https://viewer.ipaper.io/demo-flipbooks/flipbooks/home-kitchen-2/";

  useEffect(() => {
    // Function to initialize iPaperJsApi for your myFlipbook iframe
    const initializeFlipbook = () => {
      const Flipbook = document.getElementById("Flipbook");
      if (Flipbook) {
        const FlipbookInstance = iPaperJsApi(Flipbook, 3);

        //set instance in ref to be used in child components
        flipbookInstanceRef.current = FlipbookInstance;

        // Set pages object
        FlipbookInstance.paging.getState((result) => {
          setPagesObject({
            startsWithSpread: result.spreads[0].length === 2,
            currentSpread: result.currentSpread,
            totalPages: result.totalPages,
            spreads: result.spreads,
          });
        });

        FlipbookInstance.paging.onChange((result) => {
          setPagesObject((prevPagesObject) => ({
            ...prevPagesObject,
            currentSpread: result.currentSpread,
          }));
        });
      }
    };

    initializeFlipbook();
  }, []);


  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <div className="h-16 px-4 flex flex-row items-center justify-start">
          <ToggleGridBtn showGrid={showGrid} setShowGrid={setShowGrid} />
          <RangeSlider
            totalSpreads={pagesObject.spreads.length}
            currentSpread={pagesObject.currentSpread}
            spreads={pagesObject.spreads}
            flipbookInstance={flipbookInstanceRef.current}
          />
        </div>
        <div className="h-12 px-4 flex flex-row items-center justify-start">
          <NavigationArrows 
          lastPage={pagesObject.totalPages}
          flipbookInstance={flipbookInstanceRef.current}
          />
        </div>
        <div className="flex h-full relative">
          <PagesGrid
            baseURL={baseURL}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            totalPages={pagesObject.totalPages}
            flipbookInstance={flipbookInstanceRef.current}
          />
          <iframe
            id="Flipbook"
            className="w-full h-full"
            //adds querystring to hide standard UI + Navigation buttons
            src={`${baseURL}?HideNavigationBars=true&HideStandardUI=true`}
          />
        </div>
      </div>
      {/* call api */}
      <script src="https://cdn.ipaper.io/flipbooks/api/v3/latest.js"></script>
    </>
  );
}
