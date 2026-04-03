import Sidebar from "./Sidebar"

function Layout({children}){
    return (
        <div className="flex">
            <Sidebar/>
            <div className="p-5 flex-1">
                {children}
            </div>
        </div>
    )
}

export default Layout