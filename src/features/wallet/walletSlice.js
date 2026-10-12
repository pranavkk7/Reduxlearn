import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'

// The wallet's state: a balance, every transaction that changed it (newest first), and the
// reason the last action was refused, if it was.
const initialState = {
  owner: 'Demo wallet',
  balance: 25000,
  transactions: [],
  error: null,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    deposit: {
      // `prepare` keeps the reducer pure: the id and time are made when the action is created.
      prepare: (amount) => ({ payload: { id: nanoid(), amount, at: Date.now() } }),
      reducer(state, action) {
        const { id, amount, at } = action.payload
        if (!isValidAmount(amount)) {
          state.error = 'Enter an amount greater than zero.'
          return
        }
        // Immer (built into Redux Toolkit) turns these "mutations" into a new state object.
        state.balance += amount
        state.transactions.unshift({ id, type: 'deposit', amount, at })
        state.error = null
      },
    },
    withdraw: {
      prepare: (amount) => ({ payload: { id: nanoid(), amount, at: Date.now() } }),
      reducer(state, action) {
        const { id, amount, at } = action.payload
        if (!isValidAmount(amount)) {
          state.error = 'Enter an amount greater than zero.'
          return
        }
        if (amount > state.balance) {
          state.error = 'Not enough balance for that withdrawal.'
          return
        }
        state.balance -= amount
        state.transactions.unshift({ id, type: 'withdraw', amount, at })
        state.error = null
      },
    },
    clearError(state) {
      state.error = null
    },
    reset() {
      return initialState
    },
  },
})

function isValidAmount(amount) {
  return Number.isFinite(amount) && amount > 0
}

export const { deposit, withdraw, clearError, reset } = walletSlice.actions
export default walletSlice.reducer

// Selectors: components read state through these, so the state's shape can change in one place.
export const selectWallet = (state) => state.wallet
export const selectBalance = (state) => state.wallet.balance
export const selectTransactions = (state) => state.wallet.transactions
export const selectError = (state) => state.wallet.error

// Memoised: recalculated only when the transaction list changes.
export const selectTotals = createSelector([selectTransactions], (transactions) =>
  transactions.reduce(
    (totals, t) => {
      totals[t.type === 'deposit' ? 'in' : 'out'] += t.amount
      return totals
    },
    { in: 0, out: 0 },
  ),
)
