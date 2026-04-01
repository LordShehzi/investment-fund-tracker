import Layout from "../components/Layout"
import PortfolioCard from "../components/PortfolioCard"
import { usePortfolio } from "../context/PortfolioContext"

function Dashboard() {
  const { portfolioValue, nav, totalUnits, investors } = usePortfolio()
  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <PortfolioCard
          title="Portfolio Value"
          value={portfolioValue}
        />
        <PortfolioCard
          title="NAV"
          value={nav}
        />
        <PortfolioCard
          title="Total Units"
          value={totalUnits}
        />
        <PortfolioCard
          title="Total Investors"
          value={investors}
        />
        <PortfolioCard
          title="Profit / Loss"
          value="0 /_"
        />

      </div>

    </Layout>

  )
}

export default Dashboard