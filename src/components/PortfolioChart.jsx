import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { usePortfolio } from "../context/PortfolioContext"
import { formatNumber } from "../utils/format"

function PortfolioChart() {
  const { portfolioHistory } = usePortfolio()

  if (portfolioHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <p className="text-sm text-gray-500">Portfolio growth</p>
        <h2 className="text-xl font-semibold mt-1">No transaction history yet</h2>
        <p className="text-gray-500 mt-2">
          Add a deposit or withdrawal to generate the portfolio timeline.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Portfolio growth</p>
          <h2 className="text-xl font-semibold mt-1">Historical portfolio value</h2>
        </div>
        <p className="text-sm text-gray-500">
          {portfolioHistory.length} data points
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolioHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={90}
              tickFormatter={(value) => formatNumber(value, 1)}
            />
            <Tooltip
              formatter={(value) => [formatNumber(value, 1), "Portfolio value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart
