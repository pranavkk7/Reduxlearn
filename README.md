# Redux wallet

A small practice project for **Redux Toolkit** with React 19: a wallet where you deposit and
withdraw money, see money in and out, and keep a history. It started as my first Redux exercise with
`createStore` and was later rebuilt the way the Redux docs recommend today.

**Live demo: [pranavkk7.github.io/Reduxlearn](https://pranavkk7.github.io/Reduxlearn/)**

## What it practises
- **One slice** (`createSlice`) holds the wallet: balance, transactions and the last error.
- **Actions with `prepare`**: each deposit or withdrawal gets its id and time when the action is
  created, so the reducer stays pure.
- **Rules in the reducer**: amounts must be above zero and a withdrawal can't take the balance
  below zero. A refused action leaves the balance alone and records why.
- **Immer**: the reducer writes `state.balance += amount` and Redux Toolkit turns it into a new,
  immutable state.
- **Selectors**, including a memoised one (`createSelector`) for the money in and out totals.
- **React-Redux hooks**: `useSelector` to read and `useDispatch` to send actions, under one
  `<Provider>`.
- **`configureStore`** instead of the deprecated `createStore`, with Redux DevTools switched on.

## Run it
```bash
npm install
npm run dev
```

## Test
```bash
npm test        # 14 tests: reducer rules and the screen, with Vitest and Testing Library
npm run lint
```
GitHub Actions runs lint, tests and a build on every push, then publishes the demo to GitHub Pages.

## Structure
```
src/
  app/store.js                 configureStore, with a makeStore() for tests
  features/wallet/
    walletSlice.js             state, reducers, actions and selectors
    BalanceCard.jsx            balance and money in / out
    AmountForm.jsx             amount field, quick amounts, deposit and withdraw
    TransactionList.jsx        history and start over
    format.js                  ₹ formatting (en-IN)
```

Built with React 19, Redux Toolkit 2, React-Redux 9 and Vite.
