/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/format";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }){

    const [portfolioValue, setPortfolioValue] = useState(() => {
        const saved = localStorage.getItem("portfolioValue")
        return saved ? JSON.parse(saved) : 0
    })
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions")
        return saved ? JSON.parse(saved) : []
    })
    const [investors, setInvestors] = useState(() => {
        const saved = localStorage.getItem("investors")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("portfolioValue", JSON.stringify(portfolioValue))
        localStorage.setItem("transactions", JSON.stringify(transactions))
        localStorage.setItem("investors", JSON.stringify(investors))

    }, [portfolioValue, transactions, investors])

    const totalDeposits = transactions
        .filter(t => t.type === "deposit")
        .reduce((sum, t) => sum + t.amount, 0)
    
    const totalWithdrawals = transactions
        .filter(t => t.type === "withdraw")
        .reduce((sum, t) => sum + t.amount, 0)

    const profitLoss = portfolioValue - (totalDeposits - totalWithdrawals)

    const profitLossP = (profitLoss / (totalDeposits - totalWithdrawals)) * 100

    const totalUnits = transactions.reduce((sum, t)=> sum + t.units, 0)

    const nav = totalUnits === 0 ? 1 : portfolioValue / totalUnits

    const portfolioHistory = transactions
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reduce(
            (dailyHistory, transaction) => {
                const dayKey = transaction.date.split("T")[0]
                const isDeposit = transaction.type === "deposit"
                const depositAmount = isDeposit ? transaction.amount : 0
                const withdrawalAmount = isDeposit ? 0 : transaction.amount

                dailyHistory.cumulativeDeposits += depositAmount
                dailyHistory.cumulativeWithdrawals += withdrawalAmount

                const valueAfter = isDeposit
                    ? transaction.prev + transaction.amount
                    : transaction.prev - transaction.amount
                const netCapitalAfter =
                    dailyHistory.cumulativeDeposits - dailyHistory.cumulativeWithdrawals

                const existingDay = dailyHistory.items[dailyHistory.items.length - 1]

                if (existingDay && existingDay.dayKey === dayKey) {
                    existingDay.portfolioValue = valueAfter
                    existingDay.dailyDeposits += depositAmount
                    existingDay.dailyWithdrawals += withdrawalAmount
                    existingDay.netCapital = netCapitalAfter
                    existingDay.transactionCount += 1
                    return dailyHistory
                }

                dailyHistory.items.push({
                    id: dayKey,
                    dayKey,
                    date: formatDate(transaction.date),
                    portfolioValue: valueAfter,
                    dailyDeposits: depositAmount,
                    dailyWithdrawals: withdrawalAmount,
                    netCapital: netCapitalAfter,
                    transactionCount: 1
                })

                return dailyHistory
            },
            {
                items: [],
                cumulativeDeposits: 0,
                cumulativeWithdrawals: 0
            }
        ).items

    const investorStats = investors
        .map(person => {

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

        const profitLoss = value - (deposits - withdrawals)

        const profitLossP = (profitLoss/(deposits - withdrawals)) * 100

        return{
            person,
            units,
            value,
            ownership,
            deposits,
            withdrawals,
            profitLoss,
            profitLossP
        }
    })
    .sort((a,b) => b.value - a.value)

    function addTransaction(person, type, amount, prev, date){

        const currentNav = nav

        let units

        if(type === "deposit"){

            units = amount / currentNav

            setPortfolioValue(prev + amount)

        }else{

            const investorUnits = transactions.
            filter(t => t.person === person)
            .reduce((sum, t ) => sum + t.units, 0)

            const investorValue = investorUnits * currentNav

            if(amount > investorValue){
                alert("Withdrawal exceeds investor balance")
                return false
            }

            units = -(amount / currentNav)

            setPortfolioValue(prev - amount)

        }

        const newTransaction = {
            person,
            type,
            amount,
            prev,
            units,
            date: new Date(date).toISOString()
        }

        setTransactions(prev => [...prev, newTransaction])

        if(!investors.includes(person)){
            setInvestors(prev => [...prev, person])
        }

        return true
    }

    const value = {
        portfolioValue,
        setPortfolioValue,
        nav,
        totalUnits,
        transactions,
        totalDeposits,
        totalWithdrawals,
        profitLoss,
        profitLossP,
        investors,
        addTransaction,
        investorStats,
        portfolioHistory
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
