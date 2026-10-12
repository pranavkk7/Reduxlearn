import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import App from './App'
import { makeStore } from './app/store'

function renderApp() {
  // A fresh store per test, so tests never share state.
  render(
    <Provider store={makeStore()}>
      <App />
    </Provider>,
  )
  return userEvent.setup()
}

describe('wallet screen', () => {
  it('shows the starting balance and an empty history', () => {
    renderApp()
    expect(screen.getByText('₹25,000')).toBeInTheDocument()
    expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument()
  })

  it('deposits a quick amount and lists it', async () => {
    const user = renderApp()
    await user.click(screen.getByRole('button', { name: '₹500' }))
    await user.click(screen.getByRole('button', { name: 'Deposit' }))
    expect(screen.getByText('₹25,500')).toBeInTheDocument()
    expect(screen.getByText('+₹500')).toBeInTheDocument()
  })

  it('withdraws a typed amount', async () => {
    const user = renderApp()
    await user.type(screen.getByLabelText('Amount'), '2000')
    await user.click(screen.getByRole('button', { name: 'Withdraw' }))
    expect(screen.getByText('₹23,000')).toBeInTheDocument()
  })

  it('explains a refused withdrawal and keeps the amount to fix', async () => {
    const user = renderApp()
    const field = screen.getByLabelText('Amount')
    await user.type(field, '90000')
    await user.click(screen.getByRole('button', { name: 'Withdraw' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/not enough balance/i)
    expect(field).toHaveValue('90000')
    expect(screen.getByText('₹25,000')).toBeInTheDocument()
  })

  it('starts over from the history', async () => {
    const user = renderApp()
    await user.click(screen.getByRole('button', { name: '₹1,000' }))
    await user.click(screen.getByRole('button', { name: 'Deposit' }))
    await user.click(screen.getByRole('button', { name: 'Start over' }))
    expect(screen.getByText('₹25,000')).toBeInTheDocument()
    expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument()
  })
})
