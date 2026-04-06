import { createContext, useContext, useEffect, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }){

    const [portfolioValue, setPortfolioValue] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [investors, setInvestors] = useState([])

    const totalDeposits = transactions
        .filter(t => t.type === "deposit")
        .reduce((sum, t) => sum + t.amount, 0)
    const profitLoss = portfolioValue - totalDeposits

    const totalUnits = transactions.reduce((sum, t)=> sum + t.units, 0)

    const nav = totalUnits === 0 ? 1 : portfolioValue / totalUnits

    const investorStats = investors.map(person => {

        const investorTransactions = transactions.filter(t => t.person === person)

        const units = investorTransactions.reduce((sum, t) => sum + t.units, 0)

        const deposits = investorTransactions
        .filter(t => t.type === "deposit")
        .reduce((sum, t) => sum + t.amount, 0)

        const withdrawals = investorTransactions
        .filter((t => t.type === "withdraw"))
        .reduce((sum, t) => sum + t.amount, 0)

        const value = units * nav

        const ownership = totalUnits === 0 ? 0 : (units / totalUnits) * 100

        return{
            person,
            units,
            value,
            ownership,
            deposits,
            withdrawals
        }
    })

    function addTransaction(person, type, amount){

        const currentNav = nav

        let units

        if(type === "deposit"){

            units = amount / currentNav

            setPortfolioValue(prev => prev + amount)

        }else{

            const investorUnits = transactions.
            filter(t => t.person === person)
            .reduce((sum, t ) => sum + t.units, 0)

            const investorValue = investorUnits * currentNav

            if(amount > investorValue){
                alert("Withdrawal exceeds investor balance")
                return
            }

            units = -(amount / currentNav)

            setPortfolioValue(prev => prev - amount)

        }

        const newTransaction = {
            person,
            type,
            amount,
            units,
            date: new Date().toISOString()
        }

        setTransactions(prev => [...prev, newTransaction])

        if(!investors.includes(person)){
            setInvestors(prev => [...prev, person])
        }
    }

    const value = {
        portfolioValue,
        setPortfolioValue,
        nav,
        totalUnits,
        transactions,
        profitLoss,
        investors,
        addTransaction,
        investorStats
    }

    return(
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    )
}

export function usePortfolio(){
    return useContext(PortfolioContext)
}
