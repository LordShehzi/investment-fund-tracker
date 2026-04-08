import { usePortfolio } from "../context/PortfolioContext"
import { formatNumber } from "../utils/format"
import { Link } from "react-router-dom"

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
              <th className="text-right">Deposits</th>
              <th className="text-right">Withdrawals</th>
              <th className="text-right">Current Deposits <small className="text-gray-500 text-xsm">{`(Excl Withdrawals)`}</small></th>
              <th className="text-right">Value</th>
              <th className="text-right">P/L</th>
              <th className="text-right">Ownership %</th>
              <th className="text-right">Units</th>

            </tr>
          </thead>
          
          <tbody>

            {investorStats.map((inv, index) => (
              <tr key={index} className="border-b">
                <td className="font-medium text-blue-600">
                                  <Link to={`/investors/${inv.person}`}>
                                    {inv.person}
                                  </Link>
                                </td>
                <td className="text-right">{formatNumber(inv.deposits, 1)}</td>
                <td className="text-right">{inv.withdrawals.toLocaleString()}</td>
                <td className="text-right">{formatNumber(inv.deposits-inv.withdrawals, 1)}</td>
                <td className="text-right">{formatNumber(inv.value, 1)}</td>
                <td className={inv.profitLoss > 0 ? "text-green-600 text-right" : "text-red-600 text-right"}>{formatNumber(inv.profitLoss, 1)}{` (`+formatNumber(inv.profitLossP)+`%)`}</td>
                <td className="text-right">{(inv.ownership || 0).toFixed(2)}%</td>
                <td className="text-right">{formatNumber(inv.units, 1)}</td>
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