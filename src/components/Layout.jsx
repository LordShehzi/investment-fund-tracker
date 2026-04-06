import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

function Layout(){
    return (
        <div className="flex">
            <Sidebar/>
            <div className="p-5 flex-1 bg-gray-50 min-h-screen">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout