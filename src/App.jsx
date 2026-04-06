import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from "./pages/Dashboard"
import Investors from "./pages/Investors"
import Transactions from "./pages/Transactions"

function App() {

  return (
    <Routes >

      <Route element={<Layout/>}>

        <Route path="/" element={<Dashboard/>} />
        <Route path="investors" element={<Investors/>} />
        <Route path="/transactions" element={<Transactions/>} />

      </Route>

    </Routes>
  )
}

export default App
