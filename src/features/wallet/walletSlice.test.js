import { describe, expect, it } from 'vitest'
import { makeStore } from '../../app/store'
import reducer, { deposit, reset, selectTotals, withdraw } from './walletSlice'

const start = reducer(undefined, { type: 'init' })

describe('wallet reducer', () => {
  it('starts with the demo balance and no history', () => {
    expect(start.balance).toBe(25000)
    expect(start.transactions).toEqual([])
    expect(start.error).toBeNull()
  })

  it('adds a deposit to the balance and the history', () => {
    const state = reducer(start, deposit(500))
    expect(state.balance).toBe(25500)
    expect(state.transactions[0]).toMatchObject({ type: 'deposit', amount: 500 })
  })

  it('takes a withdrawal from the balance', () => {
    const state = reducer(start, withdraw(1000))
    expect(state.balance).toBe(24000)
    expect(state.transactions[0]).toMatchObject({ type: 'withdraw', amount: 1000 })
  })

  it('refuses a withdrawal larger than the balance and says why', () => {
    const state = reducer(start, withdraw(99999))
    expect(state.balance).toBe(25000)
    expect(state.transactions).toHaveLength(0)
    expect(state.error).toMatch(/not enough balance/i)
  })

  it('refuses zero, negative and non-numeric amounts', () => {
    for (const amount of [0, -50, Number.NaN]) {
      const state = reducer(start, deposit(amount))
      expect(state.balance).toBe(25000)
      expect(state.error).toMatch(/greater than zero/i)
    }
  })

  it('clears an old error once an action succeeds', () => {
    const refused = reducer(start, withdraw(99999))
    expect(reducer(refused, deposit(100)).error).toBeNull()
  })

  it('never changes the previous state object', () => {
    const before = structuredClone(start)
    reducer(start, deposit(500))
    expect(start).toEqual(before)
  })

  it('resets to the starting state', () => {
    const changed = reducer(reducer(start, deposit(500)), withdraw(200))
    expect(reducer(changed, reset())).toEqual(start)
  })
})

describe('selectors', () => {
  it('totals money in and out', () => {
    const store = makeStore()
    store.dispatch(deposit(500))
    store.dispatch(deposit(1500))
    store.dispatch(withdraw(300))
    expect(selectTotals(store.getState())).toEqual({ in: 2000, out: 300 })
  })
})
