import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, deposit, selectBalance, selectError, withdraw } from './walletSlice'

const QUICK_AMOUNTS = [100, 500, 1000, 5000]

/** Type or pick an amount, then deposit or withdraw it. The reducer decides what is allowed. */
export default function AmountForm() {
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const balance = useSelector(selectBalance)
  const [amount, setAmount] = useState('')

  const value = Number(amount)

  function send(action) {
    // Keep the typed amount when the reducer will refuse it, so it can be corrected.
    const accepted = value > 0 && (action !== withdraw || value <= balance)
    dispatch(action(value))
    if (accepted) setAmount('')
  }

  return (
    <section className="card" aria-label="Move money">
      <label htmlFor="amount" className="label">
        Amount
      </label>
      <div className="amount-field">
        <span aria-hidden="true">₹</span>
        <input
          id="amount"
          inputMode="numeric"
          placeholder="0"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value.replace(/[^0-9]/g, ''))
            if (error) dispatch(clearError())
          }}
        />
      </div>

      <div className="chips" role="group" aria-label="Quick amounts">
        {QUICK_AMOUNTS.map((n) => (
          <button key={n} type="button" className="chip" onClick={() => setAmount(String(n))}>
            ₹{n.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      <div className="actions">
        <button type="button" className="primary" onClick={() => send(deposit)}>
          Deposit
        </button>
        <button type="button" className="secondary" onClick={() => send(withdraw)}>
          Withdraw
        </button>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}
