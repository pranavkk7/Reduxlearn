import { useSelector } from 'react-redux'
import { selectWallet } from './features/wallet/walletSlice'

export default function UserInfo() {
  const wallet = useSelector(selectWallet)
  return (
    <div>
      <h1>
        {wallet.owner}, {wallet.balance}
      </h1>
    </div>
  )
}
