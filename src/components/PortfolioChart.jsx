import {
  CartesianGrid,
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { usePortfolio } from "../context/PortfolioContext"
import { formatNumber } from "../utils/format"

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-gray-700">{label}</p>
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
                <span className="text-gray-600">
                {item.dataKey === "portfolioValue"
                  ? "Portfolio value"
                  : item.dataKey === "dailyDeposits"
                    ? "Daily deposits"
                    : "Net capital"}
              </span>
            </div>
            <span className="font-medium text-gray-900">
              {formatNumber(item.value, 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PortfolioChart() {
  const { portfolioHistory } = usePortfolio()

  if (portfolioHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <p className="text-sm text-gray-500">Portfolio growth</p>
        <h2 className="text-xl font-semibold mt-1">No transaction history yet</h2>
        <p className="text-gray-500 mt-2">
          Add a deposit to generate the portfolio timeline.
        </p>
      </div>
    )
  }
  
        console.log(portfolioHistory)

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
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="dailyDeposits"
              name="Deposits"
              stroke="#16a34a"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="netCapital"
              name="Net capital"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="portfolioValue"
              name="Portfolio value"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart
