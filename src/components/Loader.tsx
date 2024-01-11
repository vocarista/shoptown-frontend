function Loader() {
    return (<div className="flex items-center justify-center place-items-center w-screen h-screen fixed top-0 left-0 bg-teal-50 z-50">
             <div className = "loader">
             </div>
             <span>This page can take upto 2 minutes, when loading for the first time.</span>
            </div>)
}

export default Loader;