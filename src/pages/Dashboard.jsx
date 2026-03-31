import Layout from "../components/Layout"
import PortfolioCard from "../components/PortfolioCard"

export default function Dashboard() {
  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <PortfolioCard
          title="Portfolio Value"
          value="0"
        />
        <PortfolioCard
          title="NAV"
          value="1"
        />
        <PortfolioCard
          title="Total Units"
          value="0"
        />
        <PortfolioCard
          title="Total Investors"
          value="0"
        />
        <PortfolioCard
          title="Profit / Loss"
          value="0/_"
        />

      </div>

    </Layout>

  )
}
