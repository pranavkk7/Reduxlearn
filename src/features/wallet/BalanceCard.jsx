import { useSelector } from 'react-redux'
import { formatMoney } from './format'
import { selectBalance, selectTotals, selectWallet } from './walletSlice'

/** The balance, with money in and out since the page opened. Reads the store via selectors. */
export default function BalanceCard() {
  const { owner } = useSelector(selectWallet)
  const balance = useSelector(selectBalance)
  const totals = useSelector(selectTotals)

  return (
    <section className="card balance" aria-label="Balance">
      <p className="muted">{owner}</p>
      <p className="balance-amount" aria-live="polite">
        {formatMoney(balance)}
      </p>
      <dl className="totals">
        <div>
          <dt>Money in</dt>
          <dd className="in">{formatMoney(totals.in)}</dd>
        </div>
        <div>
          <dt>Money out</dt>
          <dd className="out">{formatMoney(totals.out)}</dd>
        </div>
      </dl>
    </section>
  )
}
