# Lint Fix TODO

## Goal

Fix all ESLint errors and warnings in the client codebase.

## Files to Fix

### 1. `client/src/context/AppContext.jsx`

- [ ] Memoize `axiosInstance` with `useMemo`
- [ ] Restructure initial data loading effect (lines 337-341) to avoid synchronous setState in effect
- [ ] Restructure token effect (lines 344-350) to avoid synchronous setState in effect
- [ ] Restructure userToken effect (lines 353-357) to avoid synchronous setState in effect
- [ ] Restructure fetchCart effect (lines 360-368) to avoid synchronous setState in effect

### 2. `client/src/pages/lab/Labs.jsx`

- [ ] Inline fetch logic in useEffect using `.then().catch()` chains
- [ ] Remove `fetchLabs` `useCallback` wrapper

### 3. `client/src/components/chatbot/Chatbot.jsx`

- [ ] Wrap `fetchAppointments` in `useCallback`
- [ ] Add `fetchAppointments` to useEffect dependency array

### 4. `client/src/pages/Cart.jsx`

- [ ] Wrap `getCart` in `useCallback`
- [ ] Wrap `getUserAddress` in `useCallback`
- [ ] Add dependencies to useEffect arrays

### 5. `client/src/pages/doctor/Doctors.jsx`

- [ ] Wrap `applyFilter` in `useCallback`
- [ ] Add to useEffect dependency array

### 6. `client/src/pages/doctor/MyDoctorsAppointments.jsx`

- [ ] Wrap `getUserAppointments` in `useCallback`
- [ ] Wrap `verifyPaymentStatus` in `useCallback`
- [ ] Add dependencies to all useEffect arrays

### 7. `client/src/pages/drug/DrugDetails.jsx`

- [ ] Memoize `product` with `useMemo`
- [ ] Add `product` to useEffect dependency array

## Verification

- [ ] Run `npm run lint` in client/ — should pass with 0 errors, 0 warnings
- [ ] Run `npm run build` to ensure no runtime regressions
