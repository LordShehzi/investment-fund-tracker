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
              <th>Withdrawals</th>
              <th>Units</th>
              <th>Ownership %</th>
              <th>Value</th>

            </tr>
          </thead>
          
          <tbody>
{console.log(investorStats)}
            {investorStats.map((inv, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{inv.person}</td>
                <td>{inv.deposits.toLocaleString()}</td>
                <td>{inv.withdrawals.toLocaleString()}</td>
                <td>{(inv.units || 0).toFixed(2)}</td>
                <td>{(inv.ownership || 0).toFixed(2)}%</td>
                <td>{(inv.value || 0).toFixed(2).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>


  )
}

export default Investors