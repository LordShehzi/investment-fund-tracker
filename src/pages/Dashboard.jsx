import PortfolioCard from "../components/PortfolioCard"
import { usePortfolio } from "../context/PortfolioContext"
import { formatNumber } from "../utils/format"

function Dashboard() {

  const { 
    portfolioValue,
    setPortfolioValue,
    nav,
    totalUnits,
    totalDeposits,
    totalWithdrawals,
    investors,
    profitLoss,
    profitLossP
  } = usePortfolio()

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="mb-6 bg-white p-4 rounded shadow w-80">

        <p className="font-semibold mb-2">
          Update Portfolio Value
        </p>

        <input
          type="number"
          value={portfolioValue}
          onChange={(e) => setPortfolioValue(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />

      </div>

      <div className="grid grid-cols-4 gap-6">

        <PortfolioCard 
        title="Portfolio Value" 
        value={formatNumber(portfolioValue, 1)} 
        valueClassName={portfolioValue > (totalDeposits - totalWithdrawals) ? "text-green-500" : "text-red-500"} 
        />

        <PortfolioCard 
        title="Total Deposits" 
        value={formatNumber(totalDeposits, 1)} 
        />

        <PortfolioCard 
        title="Total Withdrawals" 
        value={formatNumber(totalWithdrawals, 1)} 
        />

        <PortfolioCard 
        title="Deposits - Withdrawals" 
        value={formatNumber(totalDeposits - totalWithdrawals, 1)} 
        />
        
        <PortfolioCard 
        title="NAV" 
        value={nav.toFixed(2)} 
        />

        <PortfolioCard 
        title="Total Units" 
        value={formatNumber(totalUnits)} 
        />

        <PortfolioCard 
        title="Total Investors" 
        value={investors.length} 
        />

        <PortfolioCard 
        title="Profit / Loss" 
        value={formatNumber(profitLoss, 1) + ` (` + formatNumber(profitLossP) + `%)`} 
        valueClassName={profitLoss > 0 ? "text-green-500" : "text-red-500"} 
        />


      </div>

    </>

  )
}

export default Dashboard