import { useDispatch, useSelector } from 'react-redux'
import { formatMoney, formatTime } from './format'
import { reset, selectTransactions } from './walletSlice'

/** Every change to the balance, newest first. */
export default function TransactionList() {
  const dispatch = useDispatch()
  const transactions = useSelector(selectTransactions)

  return (
    <section className="card" aria-label="History">
      <div className="history-head">
        <h2>History</h2>
        {transactions.length > 0 && (
          <button type="button" className="link" onClick={() => dispatch(reset())}>
            Start over
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <p className="muted">No transactions yet. Deposit or withdraw to see them here.</p>
      ) : (
        <ul className="history">
          {transactions.map((t) => (
            <li key={t.id}>
              <span>{t.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</span>
              <span className="muted">{formatTime(t.at)}</span>
              <span className={t.type === 'deposit' ? 'in' : 'out'}>
                {t.type === 'deposit' ? '+' : '−'}
                {formatMoney(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
