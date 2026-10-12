// Indian rupee formatting: ₹25,000 and ₹1,25,000.
const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const time = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' })

export const formatMoney = (amount) => money.format(amount)
export const formatTime = (at) => time.format(at)
