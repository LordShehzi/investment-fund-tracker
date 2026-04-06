import { Link } from "react-router-dom"

function Sidebar(){
    return (
        <div style = {{width:"200px", background:"#eee", padding:"20px"}}>

            <h3 className="text-2xl font-bold mb-6">Fund Tracker</h3>
            <nav className="flex flex-col gap-3">
                <div>
                    <Link className="text-xl" to="/">Dashboard</Link>
                </div>

                <div>
                    <Link className="text-xl" to="/investors">Investors</Link>
                </div>

                <div>
                    <Link className="text-xl" to="/transactions">Transactions</Link>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
