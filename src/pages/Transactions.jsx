import { useState, useEffect } from "react"
import { usePortfolio } from "../context/PortfolioContext"
import { formatDate, formatNumber } from "../utils/format"

function Transactions() {

  const { addTransaction, transactions, investors, portfolioValue} = usePortfolio()

  const [ person, setPerson ] = useState("")
  const [ amount, setAmount ] = useState("")
  const [ prev, setPrev ] = useState(portfolioValue)
  const [ type, setType ] = useState("deposit")
  const [ date, setDate ] = useState(()=>{
    return new Date().toISOString().split("T")[0]
  })

  const [ selectedInvestor, setSelectedInvestor ] = useState("")

  const filteredTransactions = selectedInvestor
  ? transactions.filter((t) => t.person === selectedInvestor)
  : transactions

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  function handleSubmit(e){
    e.preventDefault()

    if(!person || !amount) return

    const success = addTransaction(person, type, Number(amount), Number(prev), date)

    setPerson("")
    setAmount("")
    if(success){
      setPrev(current =>
        current + (
          type === "deposit"
          ? Number(amount)
          : -Number(amount)
        )
      )
    }
  }

  return(
    <>

      <h1 className="text-3xl font-bold mb-8">
        Transactions
      </h1>

      {/* Form */}

      <div className="bg-white shadow rounded p-4 mb-6">

        <form 
        onSubmit={handleSubmit}
        className="flex gap-4 items-end"
        >
            <div>
              <label className="block text-sm">Investor</label>
              <input
              className="border p-2 rounded"
              list="investor-list"
              value={person}
              placeholder="Investor Name"
              onChange={e => setPerson(e.target.value)}
              />
              <datalist id="investor-list">
                {investors.map((inv) => (
                  <option key={inv} value={inv}></option>
                ))}
              </datalist>

            </div>
            
            <div>
              <label className="block text-sm">Amount</label>
              <input
              type="number"
              className="border p-2 rounded"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm">Current Portfolio Value</label>
              <input
              type="number"
              className="border p-2 rounded"
              value={prev}
              onChange={e => setPrev(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm">Date</label>
              <input
                type="date"
                className="border p-2 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm">Type</label>
              <select 
              className="border p-2 rounded"
              value={type}
              onChange={e => setType(e.target.value)}
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
              </select>
            </div>

            <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>

        </form>

      </div>


      {/* Table */}

      <div className="rounded shadow bg-white p-4">
        
        <div className="flex">

          <h2 className="text-lg font-semibold mb-4">
            Transaction History
          </h2>
        
          <div className="ml-auto">
            <label className="mr-2">Filter Investor:</label>
            <select
            className="border p-2 rounded"
            value={selectedInvestor}
            onChange={(e) => setSelectedInvestor(e.target.value)}
            >
              <option value="">All</option>
              {investors.map((inv) => (
                <option key={inv} value={inv}>{inv}</option>
              ))}
            </select>
          </div>

        </div>

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="py-2">Investor</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Units</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {sortedTransactions
            .map((t, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{t.person}</td>
                <td>{t.type}</td>
                <td>{formatNumber(t.amount, 1)}</td>
                <td>{formatNumber(t.units, 1)}</td>
                <td>{formatDate(t.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Transactions
