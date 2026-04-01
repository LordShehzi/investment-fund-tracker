import { Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Investors from "./pages/Investors"
import Transactions from "./pages/Transactions"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="investors" element={<Investors/>} />
      <Route path="/transactions" element={<Transactions/>} />
    </Routes>
  )
}

export default App
