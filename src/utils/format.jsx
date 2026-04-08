export function formatNumber(num, none){ // Pass 1 in second arg for no decimal points
    return num.toLocaleString(undefined, {
        minimumFractionDigits:none ? 0 : 2,
        maximumFractionDigits:none ? 0 : 2
    })
}

export function formatDate(date){
    return new Date(date).toLocaleDateString("en-GB")
}