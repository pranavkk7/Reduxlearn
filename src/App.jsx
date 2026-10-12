import AmountForm from './features/wallet/AmountForm'
import BalanceCard from './features/wallet/BalanceCard'
import TransactionList from './features/wallet/TransactionList'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>Redux wallet</h1>
        <p className="muted">A small practice app for Redux Toolkit: one slice, selectors and React-Redux hooks.</p>
      </header>
      <BalanceCard />
      <AmountForm />
      <TransactionList />
    </main>
  )
}
