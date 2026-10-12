import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../features/wallet/walletSlice'

// `configureStore` replaces the deprecated `createStore`: it combines reducers, adds the thunk
// middleware and turns on the Redux DevTools extension.
export function makeStore(preloadedState) {
  return configureStore({ reducer: { wallet: walletReducer }, preloadedState })
}

export const store = makeStore()
