import { useState } from "react"
import { usePortfolio } from "../context/PortfolioContext"
import Layout from "../components/Layout"

function Transactions() {

  const { addTransaction, transactions} = usePortfolio()

  const[ person, setPerson] = useState("")
  const[ amount, setAmount] = useState("")
  const[ type, setType] = useState("deposit")

  function handleSubmit(e){
    e.preventDefault()

    if(!person || !amount) return

    addTransaction(person, type, Number(amount))

    setPerson("")
    setAmount("")
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
              value={person}
              onChange={e => setPerson(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm">Amount</label>
              <input
              type="number"
              className="border p-2 rounded"
              value={amount.toLocaleString()}
              onChange={e => setAmount(e.target.value)}
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
        
        <h2 className="text-lg font-semibold mb-4">
          Transaction History
        </h2>

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="py-2">Investor</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Units</th>
            </tr>
          </thead>

          <tbody>
{console.log(transactions)}
            {transactions.map((t, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{t.person}</td>
                <td>{t.type}</td>
                <td>{t.amount.toLocaleString()}</td>
                <td>{t.units.toFixed(2).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Transactions