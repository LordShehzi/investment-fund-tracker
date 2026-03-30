import { Link } from "react-router-dom"

function Sidebar(){
    return (
        <div style = {{width:"200px", background:"#eee", padding:"20px"}}>

            <h3>Fund Tracker</h3>
            <nav>
                <div>
                    <Link to="/">Dashboard</Link>
                </div>

                <div>
                    <Link to="/investors">Investors</Link>
                </div>

                <div>
                    <Link to="/transactions">Transactions</Link>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
