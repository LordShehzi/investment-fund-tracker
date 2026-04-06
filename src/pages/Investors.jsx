import { usePortfolio } from "../context/PortfolioContext"

function Investors() {

  const { investorStats } = usePortfolio()

  return (

    <>
    
      <h1 className="text-3xl font-bold mb-8">
        Investors
      </h1>

      <div className="bg-white shadow rounded p-4">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">

              <th className="py-2">Investor</th>
              <th>Deposits</th>
              <th>Value</th>
              <th>P/L</th>
              <th>Withdrawals</th>
              <th>Ownership %</th>
              <th>Units</th>

            </tr>
          </thead>
          
          <tbody>

            {investorStats.map((inv, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{inv.person}</td>
                <td>{inv.deposits.toLocaleString()}</td>
                <td>{(inv.value || 0).toLocaleString()}</td>
                <td className={inv.profitLoss > 0 ? "text-green-600" : "text-red-600"}>{(inv.profitLoss || 0).toLocaleString()}</td>
                <td>{inv.withdrawals.toLocaleString()}</td>
                <td>{(inv.ownership || 0).toFixed(2)}%</td>
                <td>{(inv.units || 0).toFixed(2)}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>


  )
}

export default Investors