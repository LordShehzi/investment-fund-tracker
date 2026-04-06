import PortfolioCard from "../components/PortfolioCard"
import { usePortfolio } from "../context/PortfolioContext"

function Dashboard() {
  const { portfolioValue, setPortfolioValue, nav, totalUnits, investors, profitLoss } = usePortfolio()
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
          onChange={(e) => setPortfolioValue(Number(e.target.value.toLocaleString()))}
          className="border rounded p-2 w-full"
        />

      </div>

      <div className="grid grid-cols-3 gap-6">

        <PortfolioCard title="Portfolio Value" value={portfolioValue.toLocaleString()} />
        <PortfolioCard title="NAV" value={nav} />
        <PortfolioCard title="Total Units" value={totalUnits.toLocaleString()} />
        <PortfolioCard title="Total Investors" value={investors.length} />
        <PortfolioCard title="Profit / Loss" value={profitLoss.toLocaleString()} />

      </div>

    </>

  )
}

export default Dashboard