function PortfolioCard({ title,value }){
    return(
        
        <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <h3 className="text-2xl font-bold mt-2">
                {value}
            </h3>

        </div>

    )
}

export default PortfolioCard