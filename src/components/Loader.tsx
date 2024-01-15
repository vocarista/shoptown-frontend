function Loader() {
    return (<div className="flex flex-col items-center justify-center place-items-center w-screen h-screen fixed top-0 left-0 bg-teal-50 z-50">
             <div className = "loader">
             </div>
             <span className = "text-slate-400 text-xl mt-10 p-5 text-center">This page can take upto 2 minutes, when loading for the first time.</span>
            </div>)
}

export default Loader;