import { useDispatch } from 'react-redux'
import { deposit, withdraw } from './features/wallet/walletSlice'

export default function Button() {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(deposit(500))}>Add 500</button>
      <button onClick={() => dispatch(withdraw(500))}>Remove 500</button>
    </div>
  )
}
