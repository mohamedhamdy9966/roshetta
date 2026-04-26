# Lint Fix TODO

## Goal

Fix all ESLint errors and warnings in the client codebase.

## Progress

### 1. `client/src/context/AppContext.jsx`

- [x] Memoize `axiosInstance` with `useMemo`
- [x] Restructure initial data loading effect (lines 337-341) to avoid synchronous setState in effect
- [x] Restructure token effect (lines 344-350) to avoid synchronous setState in effect
- [x] Restructure userToken effect (lines 353-357) to avoid synchronous setState in effect
- [x] Restructure fetchCart effect (lines 360-368) to avoid synchronous setState in effect

### 2. `client/src/pages/lab/Labs.jsx`

- [x] Inline fetch logic in useEffect using `.then().catch()` chains
- [x] Remove `fetchLabs` `useCallback` wrapper

### 3. `client/src/components/chatbot/Chatbot.jsx`

- [x] Wrap `fetchAppointments` in `useCallback`
- [x] Add `fetchAppointments` to useEffect dependency array

### 4. `client/src/pages/Cart.jsx`

- [x] Wrap `getCart` in `useCallback`
- [x] Wrap `getUserAddress` in `useCallback`
- [x] Add dependencies to useEffect arrays

### 5. `client/src/pages/doctor/Doctors.jsx`

- [x] Wrap `applyFilter` in `useCallback`
- [x] Add to useEffect dependency array

### 6. `client/src/pages/doctor/MyDoctorsAppointments.jsx`

- [x] Wrap `getUserAppointments` in `useCallback`
- [x] Wrap `verifyPaymentStatus` in `useCallback`
- [x] Add dependencies to all useEffect arrays

### 7. `client/src/pages/drug/DrugDetails.jsx`

- [x] Memoize `product` with `useMemo`
- [x] Add `product` to useEffect dependency array

## Verification

- [x] Run `npm run lint` in client/ — should pass with 0 errors, 0 warnings
- [x] Run `npm run build` to ensure no runtime regressions
