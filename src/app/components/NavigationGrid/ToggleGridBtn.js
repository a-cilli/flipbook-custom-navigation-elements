const ToggleGridBtn = ({showGrid, setShowGrid}) => {

  // button: toggle state of showGrid

  return (
    <button 
    className='bg-gray-200 rounded-full h-10 w-[6.2rem] relative'
    onClick={()=>setShowGrid(!showGrid)}
    >
      <div className={`absolute top-1 ${showGrid ? "left-12" : "left-1" } h-8 w-12 bg-white rounded-full z-10`}
       style={{
        transition: "left .3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      />
      <div className='h-full w-1/2 flex justify-center items-center absolute top-0 left-0 z-20'>
        <img 
        src="/images/book-open-text.svg"
        className='mt-[2px] ml-1'
        />
      </div>
      <div className='h-full w-1/2 flex justify-center items-center absolute top-0 right-0 z-20'>
        <img 
        src="/images/layout-grid.svg"
        className='mr-1'
        />
      </div>
    </button>
  )
}

export default ToggleGridBtn
