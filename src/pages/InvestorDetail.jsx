import { useParams } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { formatDate, formatNumber } from "../utils/format";

function InvestorDetail(){
    
    const { name } = useParams()

    const { investorStats, transactions } = usePortfolio()

    const investor = investorStats.find(i => i.person === name)

    const investorTransactions = transactions.filter(t => t.person === name)

    return(

        <div>

            <h1 className="text-3xl font-bold mb-8">
                {name} <small className="text-gray-600">Ledger</small>
            </h1>

            <div className="grid grid-cols-4 gap-6 mb-10">

                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-sm">Units</p>
                    <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(investor.units)}
                    </h3>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-sm">Value</p>
                    <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(investor.value)}
                    </h3>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-sm">Deposits</p>
                    <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(investor.deposits)}
                    </h3>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-gray-500 text-sm">Withdrawals</p>
                    <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(investor.withdrawals)}
                    </h3>
                </div>

            </div>

            <table className="w-full bg-white shadow rounded xl">
                <thead className="border-b">
                    <tr>

                        <th className="p-4 text-left">Type</th>
                        <th className="p-4 text-left">Amount</th>
                        <th className="p-4 text-left">Units</th>
                        <th className="p-4 text-left">Date</th>

                    </tr>
                </thead>
                <tbody>

                    {investorTransactions.map((t, i) => (
                        <tr key={i} className="border-b">
                            
                            <td className="p-4">{t.type}</td>

                            <td className="p4">
                                {formatNumber(t.amount)}
                            </td>
                            
                            <td className="p4">
                                {formatNumber(t.units)}
                            </td>
                            
                            <td className="p4">
                                {formatDate(t.date)}
                            </td>
                            
                        </tr>
                    ))}

                </tbody>

            </table>
            
        </div>
        
    )
}

export default InvestorDetail