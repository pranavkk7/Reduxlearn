import { useSelector } from "react-redux"

export default function UserInfo() {
  const data = useSelector((state) => state.user)
  return (
    <div>
      <h1>{data.username} , {data.balance}</h1>
    </div>
  )
}