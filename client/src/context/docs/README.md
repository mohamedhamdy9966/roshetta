# AppContext Documentation - Complete Reference Guide

## Overview

The `context` folder contains React Context API implementations for managing global application state in the Roshetta healthcare platform. The primary context is `AppContext`, which serves as the centralized state management solution for the entire application.

**Context Structure**:
```
context/
├── AppContext.jsx          # Main application context provider
└── docs/
    └── README.md          # Quick reference guide
```

### Purpose of AppContext

`AppContext` is a centralized state management solution that provides:
- **Authentication state**: Both admin and user tokens
- **User profile data**: Admin and regular user information
- **Doctor and drug listings**: Core healthcare data
- **Shopping cart management**: Complete e-commerce functionality
- **Chatbot context data**: AI assistant context information
- **Backend API integration**: Centralized axios instance

### Context Creation

```jsx
export const AppContext = createContext();
```

This creates a React Context object that allows components to subscribe to context changes without having to pass props through multiple levels.

## Quick Navigation

- [State Overview](#state-overview)
- [Authentication Systems](#authentication-systems)
- [Data Fetching Functions](#data-fetching-functions)
- [Cart Management System](#cart-management-system)
- [useEffect Hooks & Flow](#useeffect-hooks--execution-flow)
- [Component Integration](#component-integration)
- [Best Practices & Patterns](#best-practices--patterns)
- [Troubleshooting Guide](#troubleshooting-guide)

---

## State Overview

### Core State Variables

```jsx
// Currency and Backend Configuration
const currencySymbol = "EGP";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Authentication Tokens
const [token, setToken] = useState();           // Admin/Doctor token
const [userToken, setUserToken] = useState();   // User token (eCommerce)

// User Data
const [userData, setUserData] = useState();     // Admin data
const [user, setUser] = useState();             // User profile (eCommerce)

// Collections
const [doctors, setDoctors] = useState([]);
const [drugs, setDrugs] = useState([]);

// Cart Management
const [cartItems, setCartItems] = useState({});

// UI State
const [showUserLogin, setShowUserLogin] = useState(false);
const [selectedUser, setSelectedUser] = useState(false);

// Special Context
const [chatbotContext, setChatbotContext] = useState({
  doctors: [],
  labs: []
});

// Currency Display
const [currency] = useState("EGP ");
```

### State Variables Explained

| State Variable | Type | Purpose |
|---|---|---|
| `token` | string\|boolean | Admin authentication token (JWT) |
| `userToken` | string\|boolean | Regular user authentication token (eCommerce) |
| `userData` | object\|boolean | Admin/profile data from backend |
| `user` | object\|boolean | Current user profile information |
| `doctors` | array | List of all doctors |
| `drugs` | array | List of all drugs/medications |
| `cartItems` | object | Shopping cart items (key: drugId, value: quantity) |
| `chatbotContext` | object | Context data for chatbot (doctors, labs) |
| `currencySymbol` | string | Currency display (EGP) |
| `backendUrl` | string | API base URL from environment |

---

## AppContextProvider Component

The `AppContextProvider` component is the wrapper that manages all global state and provides it to the entire application.

---

## Authentication Systems

### Two-Token Architecture

The context implements a dual-token authentication system to handle both platform features and e-commerce operations:

#### 1. Admin/App Token (Platform Features)
- **Purpose**: Appointments, profile management, general app features
- **Storage**: `token` state, `userData` object
- **Header**: `{ token }`
- **Use Cases**: Doctor appointments, profile updates, notifications
- **Example**:
```jsx
const { token, setToken, userData } = useContext(AppContext);

// Login
setToken(receivedToken);
localStorage.setItem('token', token);

// Logout
setToken(false);
localStorage.removeItem('token');
```

#### 2. User Token (eCommerce)
- **Purpose**: Shopping cart, drug orders, checkout, payments
- **Storage**: `userToken` state, `user` object
- **Header**: `{ Authorization: 'Bearer ' + userToken }`
- **Use Cases**: Add to cart, checkout, order history, wallet
- **Example**:
```jsx
const { userToken, setUserToken, user } = useContext(AppContext);

// Login
setUserToken(receivedToken);
localStorage.setItem('userToken', token);

// Logout
setUserToken(false);
localStorage.removeItem('userToken');
```

### Key Differences

| Feature | token | userToken |
|---------|-------|-----------|
| Purpose | Main app auth | Shopping/eCommerce auth |
| Header Format | `{ token }` | `{ Authorization: 'Bearer' }` |
| Profile Data | `userData` | `user` |
| Profile Load | `loadUserProfileData()` | `loadUserProfile()` |
| Lifecycle | App-wide | eCommerce specific |
| Logout Behavior | Clear profile | Clear profile & cart |

---

## Axios Instance

```jsx
const axiosInstance = axios.create({
  baseURL: backendUrl,
});
```

**Why Centralized Axios**: 
- Centralizes API configuration
- Automatically prepends baseURL to all requests
- Allows easy modification of global request settings (headers, interceptors, etc.)
- All API calls use this instance

---

## Data Fetching Functions

### 1. getDoctorsData()

```jsx
const getDoctorsData = async () => {
  try {
    const { data } = await axiosInstance.get("/api/doctor/list");
    if (data.success) {
      setDoctors(data?.doctors || []);  // Fallback to empty array
    } else {
      toast.error(data.message);
      setDoctors([]);
    }
  } catch (error) {
    toast.error(error.message);
    setDoctors([]);
  }
};
```

**Purpose**: Fetches list of all doctors from backend

**Returns**: Updates `doctors` state with array of doctor objects

**Error Handling**: 
- Shows toast notification on error
- Always sets state to array (never null)
- Prevents component crashes

**Doctor Object Structure**:
```jsx
{
  _id: string,
  name: string,
  specialty: string,
  image: string,
  available: boolean,
  experience: number,
  rating: number
}
```

**Usage in Components**:
```jsx
const { doctors } = useContext(AppContext);
doctors.forEach(doc => console.log(doc.name));
```

---

### 2. getChatbotContext()

```jsx
const getChatbotContext = async () => {
  try {
    const { data } = await axiosInstance.get("/api/user/chatbot-context");
    if (data.success) {
      setChatbotContext(data.context);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
```

**Purpose**: Fetches context data specifically for chatbot interactions

**Data Structure**:
```jsx
{
  doctors: [{ _id, name, specialty, ... }],
  labs: [{ _id, name, tests, ... }]
}
```

**Usage**: Provides chatbot with relevant healthcare provider information

---

### 3. fetchDrugs()

```jsx
const fetchDrugs = async () => {
  try {
    const { data } = await axiosInstance.get("/api/drug/list");
    if (data.success) {
      setDrugs(data.drugs);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching drugs:", error);
    toast.error(error.message);
  }
};
```

**Purpose**: Fetches all available drugs/medications

**Used by**: 
- Drug store/pharmacy pages
- Cart calculations (getting prices)
- Drug search functionality

**Drug Object Structure**:
```jsx
{
  _id: string,
  name: string,
  category: string,
  price: number,
  offerPrice: number,
  image: string,
  description: string,
  stock: number
}
```

**Usage in Components**:
```jsx
function DrugStore() {
  const { drugs } = useContext(AppContext);
  
  return (
    <div>
      {drugs.map(drug => (
        <div key={drug._id}>
          <h3>{drug.name}</h3>
          <p>Price: {drug.offerPrice}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### 4. loadUserProfileData()

```jsx
const loadUserProfileData = async () => {
  try {
    const { data } = await axiosInstance.get("/api/user/get-profile", {
      headers: { token },  // Include admin token
    });
    if (data.success) {
      setUserData(data.userData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
```

**Purpose**: Loads authenticated admin/user profile information

**Triggered when**: Admin token exists and changes

**Data Includes**:
- User name, email
- Profile image
- Contact information
- User preferences

---

### 5. loadUserProfile()

```jsx
const loadUserProfile = async () => {
  try {
    if (!userToken) return;  // Exit if no token

    const { data } = await axiosInstance.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (data.success) {
      setUser(data.user);
    } else {
      // Token is invalid/expired
      localStorage.removeItem("userToken");
      setUserToken(false);
      setUser(false);
    }
  } catch (error) {
    console.error("Error loading user profile:", error);
    // Clean up invalid token
    localStorage.removeItem("userToken");
    setUserToken(false);
    setUser(false);
  }
};
```

**Purpose**: Loads regular user profile with userToken

**Error Handling**:
- Removes invalid tokens from localStorage
- Resets user state on failure
- Prevents app crashes with stale data

---

## Cart Management System

### Cart Data Structure

```jsx
// Cart is an object mapping drug IDs to quantities
const [cartItems, setCartItems] = useState({});

// Example state:
{
  "drugId1": 2,      // 2 units of drug 1
  "drugId2": 1,      // 1 unit of drug 2
  "drugId3": 3       // 3 units of drug 3
}
```

### Cart Operations & Functions

#### Add Item to Cart
```jsx
const { addToCart } = useContext(AppContext);

// Add 1 item (default)
addToCart('drugId123');

// Add multiple items
addToCart('drugId456', 5);
```

#### Update Item Quantity
```jsx
const { updateCartItem } = useContext(AppContext);

// Set to specific quantity
updateCartItem('drugId123', 10);

// Remove by setting to 0
updateCartItem('drugId123', 0);
```

#### Remove Item from Cart
```jsx
const { removeFromCart } = useContext(AppContext);

removeFromCart('drugId123');
```

#### Clear Entire Cart
```jsx
const { clearCart } = useContext(AppContext);

clearCart();  // Empties entire cart
```

#### Get Total Item Count
```jsx
const { getCartCount } = useContext(AppContext);

// Returns: total number of items
getCartCount();  // e.g., 6 (if 2+1+3 items)
```

#### Get Total Price
```jsx
const { getCartAmount } = useContext(AppContext);

// Returns: sum of (price × quantity)
getCartAmount();  // e.g., 500 EGP
```

---

### 1. fetchCart()

```jsx
const fetchCart = async () => {
  try {
    if (!userToken || !user) return;  // Exit if not authenticated

    const { data } = await axiosInstance.get("/api/cart/get", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (data.success) {
      setCartItems(data.cartItems || {});  // Fallback to empty object
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};
```

**Purpose**: Loads user's shopping cart from backend

**Cart Data Structure**:
```jsx
{
  "drugId1": 2,    // qty 2
  "drugId2": 1,    // qty 1
  "drugId3": 3     // qty 3
}
```

**Triggered when**: User authentication completes

---

### 2. syncCart()

```jsx
const syncCart = async (cartData) => {
  try {
    if (!userToken || !user) return;

    await axiosInstance.patch(
      "/api/cart/update",
      { cartItems: cartData },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
  } catch (error) {
    console.error("Error syncing cart:", error);
  }
};
```

**Purpose**: Synchronizes local cart state with backend

**Usage**: Called after any cart modification

**Benefits**:
- Persists cart to database
- Maintains consistency across devices/sessions
- Backup for cart data

---

### 3. addToCart()

```jsx
const addToCart = async (itemId, quantity = 1) => {
  try {
    if (!user) {
      toast.error("Please log in to add items to cart");
      setShowUserLogin(true);
      return;
    }

    // Create local copy to avoid mutations
    let cartData = structuredClone(cartItems);
    
    // Add or increment quantity
    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);  // Optimistic update for UI

    // Sync with backend
    const { data } = await axiosInstance.post(
      "/api/cart/add",
      { drugId: itemId, quantity },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    if (data.success) {
      toast.success("Added to cart successfully");
      setCartItems(data.cartItems || cartData);
    } else {
      toast.error(data.message);
      setCartItems(cartItems);  // Revert on failure
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart");
    setCartItems(cartItems);  // Revert on error
  }
};
```

**Purpose**: Adds drug to shopping cart

**Features**:
- **Authentication Check**: Prompts login if user not authenticated
- **Optimistic Update**: Updates UI immediately for better UX
- **Quantity Handling**: 
  - If item exists: increments quantity
  - If new item: initializes with quantity
- **Error Recovery**: Reverts cart to previous state on failure

**Parameters**:
- `itemId` (string): Drug database ID
- `quantity` (number): Amount to add (default: 1)

**Usage Example**:
```jsx
const { addToCart } = useContext(AppContext);

// Add single item
addToCart("drugId123");

// Add multiple items
addToCart("drugId456", 5);
```

---

### 4. updateCartItem()

```jsx
const updateCartItem = async (itemId, quantity) => {
  try {
    if (!user) {
      toast.error("Please log in to update cart");
      return;
    }

    let cartData = structuredClone(cartItems);
    
    // Remove item if quantity <= 0
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);

    // Sync with backend
    await syncCart(cartData);
    toast.success("Cart updated successfully");
  } catch (error) {
    console.error("Error updating cart:", error);
    toast.error("Failed to update cart");
  }
};
```

**Purpose**: Modifies quantity of existing cart item

**Behavior**:
- `quantity > 0`: Updates item quantity
- `quantity <= 0`: Removes item from cart
- Auto-removes items when quantity reaches 0

**Usage Example**:
```jsx
const { updateCartItem } = useContext(AppContext);

// Update quantity to 5
updateCartItem("drugId123", 5);

// Remove item (set to 0 or negative)
updateCartItem("drugId123", 0);
```

---

### 5. removeFromCart()

```jsx
const removeFromCart = async (itemId) => {
  try {
    if (!user) {
      toast.error("Please log in to remove items");
      return;
    }

    let cartData = structuredClone(cartItems);
    delete cartData[itemId];  // Delete the property
    setCartItems(cartData);

    // Sync with backend
    const { data } = await axiosInstance.delete("/api/cart/remove", {
      data: { drugId: itemId },
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (data.success) {
      toast.success("Removed from cart successfully");
      setCartItems(data.cartItems || cartData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    toast.error("Failed to remove item from cart");
  }
};
```

**Purpose**: Completely removes item from cart

**Steps**:
1. Checks user authentication
2. Removes item ID from cart object
3. Updates UI locally
4. Syncs with backend
5. Confirms removal with toast

---

### 6. getCartCount()

```jsx
const getCartCount = () => {
  let totalCount = 0;
  
  // Sum all quantities
  for (const item in cartItems) {
    totalCount += cartItems[item];
  }
  
  return totalCount;
};
```

**Purpose**: Returns total number of items in cart

**Calculation**: Sums all item quantities

**Example**:
```jsx
// Cart: { drugId1: 2, drugId2: 3, drugId3: 1 }
getCartCount();  // Returns 6

// Used in Navbar badge
<span className="badge">{getCartCount()}</span>
```

---

### 7. getCartAmount()

```jsx
const getCartAmount = () => {
  let totalAmount = 0;
  
  // Iterate through cart items
  for (const items in cartItems) {
    // Find drug details from drugs array
    let itemInfo = drugs.find((drug) => drug._id === items);
    
    // Calculate if item exists and quantity > 0
    if (itemInfo && cartItems[items] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[items];
    }
  }
  
  // Round to 2 decimal places
  return Math.floor(totalAmount * 100) / 100;
};
```

**Purpose**: Calculates total price of cart

**Calculation Logic**:
1. Iterate through each cart item
2. Find drug details from `drugs` array
3. Multiply `offerPrice` × `quantity`
4. Sum all amounts
5. Round to 2 decimal places

**Formula**: 
```
Total = Σ(offerPrice × quantity) for all items
```

**Example**:
```jsx
// Cart: { drugId1: 2, drugId2: 1 }
// Drugs: [
//   { _id: drugId1, offerPrice: 50 },
//   { _id: drugId2, offerPrice: 100 }
// ]

getCartAmount();  // Returns 200
// Calculation: (50 × 2) + (100 × 1) = 200
```

---

### 8. clearCart()

```jsx
const clearCart = async () => {
  try {
    if (!user) return;  // Exit if not authenticated

    const { data } = await axiosInstance.delete("/api/cart/clear", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (data.success) {
      setCartItems({});  // Reset to empty object
      toast.success("Cart cleared successfully");
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
```

**Purpose**: Empties the entire shopping cart

**Usage**: 
- After successful checkout
- User manual cart clear
- Order completion

---

## Context Value Object

The `value` object is what gets provided to all consuming components:

```jsx
const value = {
  // Doctors
  doctors,
  getDoctorsData,
  
  // Chatbot
  chatbotContext,
  getChatbotContext,
  
  // Currency
  currencySymbol,
  currency,
  
  // Admin Authentication
  token,
  setToken,
  userData,
  setUserData,
  loadUserProfileData,
  
  // User Authentication
  userToken,
  setUserToken,
  user,
  setUser,
  
  // Configuration
  backendUrl,
  
  // Drugs/Pharmacy
  drugs,
  setDrugs,
  fetchDrugs,
  
  // Cart Management
  cartItems,
  setCartItems,
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getCartCount,
  getCartAmount,
  clearCart,
  
  // Utilities
  navigate,
  axios: axiosInstance,
  
  // UI State
  showUserLogin,
  setShowUserLogin,
  selectedUser,
  setSelectedUser,
};
```

---

## useEffect Hooks

### 1. Initial Data Loading

```jsx
useEffect(() => {
  getDoctorsData();
  getChatbotContext();
  fetchDrugs();
}, []);  // Runs once on component mount
```

**Purpose**: Initializes application data when app loads

**Fetches**:
- All doctors for doctor platform
- Chatbot context (doctors, labs)
- All drugs for pharmacy

**Dependency**: Empty array = runs once

---

### 2. Admin User Profile Loading

```jsx
useEffect(() => {
  if (token) {
    loadUserProfileData();
  } else {
    setUserData(false);
  }
}, [token]);  // Runs when token changes
```

**Purpose**: Loads admin profile when token changes

**Triggers**:
- Login/successful authentication
- Token update
- Logout (clears userData)

---

### 3. Regular User Profile Loading

```jsx
useEffect(() => {
  if (userToken) {
    loadUserProfile();
  } else {
    setUser(false);
    setCartItems({});  // Clear cart on logout
  }
}, [userToken]);  // Runs when userToken changes
```

**Purpose**: Loads regular user profile and initializes cart

**Actions**:
- Load user profile if token exists
- Clear user data if no token
- Clear cart on logout

---

### 4. Cart Fetching

```jsx
useEffect(() => {
  if (user && userToken) {
    fetchCart();
  }
}, [user, userToken]);  // Runs when user or userToken changes
```

**Purpose**: Populates cart from backend after user loads

**Dependencies**:
- Requires both `user` and `userToken` to be valid
- Ensures user is fully loaded before fetching cart

---

## Component Integration

### Setup in App.jsx

```jsx
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      {/* Your app routes and components */}
    </AppContextProvider>
  );
}

export default App;
```

### Basic Usage in Components

```jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function MyComponent() {
  // Extract needed values from context
  const { doctors, user, cartItems, addToCart } = useContext(AppContext);

  return (
    <div>
      <p>Total Doctors: {doctors.length}</p>
      <p>Logged In: {user ? user.name : 'Not logged in'}</p>
      <p>Cart Items: {Object.keys(cartItems).length}</p>
      <button onClick={() => addToCart('drugId123')}>
        Add to Cart
      </button>
    </div>
  );
}

export default MyComponent;
```

### Using Multiple Context Values & Navbar Example

```jsx
import { AppContext } from '../context/AppContext';

function Navbar() {
  const { 
    token, 
    userData, 
    user, 
    getCartCount, 
    setToken, 
    setUserToken 
  } = useContext(AppContext);

  const handleLogout = () => {
    setToken(null);
    setUserToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userToken');
  };

  return (
    <nav>
      <p>Welcome {userData?.name || user?.name}</p>
      <span className="badge">{getCartCount()}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
```

### Complete Shopping Cart Component

```jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function ShoppingCart() {
  const {
    cartItems,
    drugs,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    clearCart,
    user
  } = useContext(AppContext);

  if (!user) return <p>Please log in</p>;
  if (getCartCount() === 0) return <p>Cart is empty</p>;

  return (
    <div>
      <h2>Shopping Cart ({getCartCount()} items)</h2>
      
      {Object.entries(cartItems).map(([drugId, quantity]) => {
        const drug = drugs.find(d => d._id === drugId);
        if (!drug) return null;
        
        return (
          <div key={drugId}>
            <p>{drug.name}</p>
            <p>Price: {drug.offerPrice} × {quantity}</p>
            
            <button onClick={() => updateCartItem(drugId, quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => updateCartItem(drugId, quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(drugId)}>Remove</button>
          </div>
        );
      })}
      
      <p>Total: {getCartAmount()} EGP</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default ShoppingCart;
```

### Product Card with Cart Integration

```jsx
function ProductCard({ product }) {
  const { 
    addToCart, 
    cartItems, 
    updateCartItem, 
    removeFromCart,
    user
  } = useContext(AppContext);

  const quantity = cartItems[product._id] || 0;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {product.offerPrice}</p>
      
      {quantity > 0 ? (
        <div className="cart-controls">
          <button onClick={() => updateCartItem(product._id, quantity - 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => updateCartItem(product._id, quantity + 1)}>
            +
          </button>
          <button onClick={() => removeFromCart(product._id)}>
            Remove
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart(product._id)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
```

---

## Best Practices & Patterns

### Pattern 1: Always Check Authentication Before Action

```jsx
// ❌ Wrong - assumes user exists
const addItem = () => {
  addToCart(itemId);
};

// ✅ Correct - addToCart handles auth internally
const addItem = () => {
  addToCart(itemId);  // Function handles auth check
};

// ✅ Also Correct - manual check
const addItem = () => {
  if (!user) {
    toast.error('Please log in');
    return;
  }
  addToCart(itemId);
};
```

### Pattern 2: Safe Property Access

```jsx
// ❌ Crashes if user is false
const userName = user.name;

// ✅ Safe with ternary
const userName = user ? user.name : 'Guest';

// ✅ Safe with optional chaining
const userName = user?.name ?? 'Guest';
```

### Pattern 3: Conditional Rendering Based on Auth

```jsx
function Header() {
  const { user, userData, token } = useContext(AppContext);
  
  return (
    <header>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : token ? (
        <p>Welcome, {userData?.name}</p>
      ) : (
        <p>Welcome, Guest</p>
      )}
    </header>
  );
}
```

### Pattern 4: Loading Indicators

```jsx
function DoctorsList() {
  const { doctors } = useContext(AppContext);
  
  if (!doctors || doctors.length === 0) {
    return <p>Loading doctors...</p>;
  }
  
  return (
    <ul>
      {doctors.map(doc => (
        <li key={doc._id}>{doc.name}</li>
      ))}
    </ul>
  );
}
```

### Pattern 5: Cart Operations with Feedback

```jsx
function ProductCard({ product }) {
  const { cartItems, addToCart, updateCartItem } = useContext(AppContext);
  const quantity = cartItems[product._id] || 0;
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.offerPrice} EGP</p>
      
      {quantity > 0 ? (
        <div>
          <button onClick={() => updateCartItem(product._id, quantity + 1)}>
            Add More ({quantity})
          </button>
          <button onClick={() => updateCartItem(product._id, quantity - 1)}>
            Remove One
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart(product._id)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Always Check Authentication

```jsx
// ❌ Bad
const { user, userData } = useContext(AppContext);
const name = user.name;  // Error if user is false

// ✅ Good
const { user, userData } = useContext(AppContext);
const name = user ? user.name : 'Guest';
```

### 2. Use Destructuring for Performance

```jsx
// ❌ Inefficient - rerenders on any context change
const context = useContext(AppContext);
const name = context.user?.name;

// ✅ Better - uses only needed values
const { user } = useContext(AppContext);
const name = user?.name;
```

### 3. Handle Errors in Cart Operations

```jsx
// ✅ Always check for success
try {
  await addToCart(itemId);
  // Item added successfully
} catch (error) {
  // Handle error
}
```

### 4. Use Optimistic Updates

```jsx
// ✅ Update UI immediately, sync backend
setCartItems(newCart);  // Update UI first
await syncCart(newCart);  // Sync to backend
```

---

## Troubleshooting Guide

### Issue: "user is not defined" or "userData is not defined"

**Problem**: Accessing properties without checking if object exists

**Solution**:
```jsx
// ❌ Causes error
const name = user.name;

// ✅ Safe access
const name = user ? user.name : 'Guest';
// or
const name = user?.name || 'Guest';
```

---

### Issue: Cart not persisting after refresh

**Problem**: Cart state is lost on page reload

**Debugging**:
```jsx
// Check if this runs
console.log('Fetching cart...');
useEffect(() => {
  if (user && userToken) {
    console.log('Fetch cart triggered');
    fetchCart();
  }
}, [user, userToken]);
```

**Solution**: Ensure `fetchCart()` completes before rendering cart and that it's properly synced to backend

---

### Issue: Multiple API calls for same data

**Problem**: Functions called multiple times unnecessarily

**Solution**: Use useCallback to memoize functions

```jsx
const getDoctorsData = useCallback(async () => {
  // ... fetch logic
}, []);
```

---

### Issue: Token not being saved

**Problem**: Token lost on page refresh

**Solution**: Token is saved to localStorage automatically:

```jsx
// When setting token
setToken(token);
localStorage.setItem('token', token);

// When reading token
const token = localStorage.getItem('token');
setToken(token);
```

---

### Authentication Not Working

**Problem**: User stays logged in or doesn't stay logged in

**Check**:
```jsx
// localStorage should have token
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('userToken'));

// Context should read it on load
const [token, setToken] = useState(
  localStorage.getItem("token") ? localStorage.getItem("token") : false
);
```

---

### API Calls Failing

**Problem**: "Cannot read property of undefined"

**Check**:
```jsx
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
console.log('Token header:', token);
console.log('User token header:', userToken);
```

**Solution**: Verify `.env` file has `VITE_BACKEND_URL` set

---

## Debugging Tips

### 1. Check Context Values

```jsx
function DebugComponent() {
  const context = useContext(AppContext);
  
  console.log('Context:', context);
  console.log('User:', context.user);
  console.log('Cart:', context.cartItems);
  console.log('Token:', context.token);
}
```

### 2. Monitor State Changes

```jsx
// Add to AppContext.jsx temporarily
useEffect(() => {
  console.log('User data changed:', userData);
}, [userData]);

useEffect(() => {
  console.log('Cart changed:', cartItems);
}, [cartItems]);
```

### 3. Check LocalStorage

```jsx
// In browser console
localStorage.getItem('token');
localStorage.getItem('userToken');
```

### 4. Network Debugging

- Open DevTools → Network tab
- Check API calls to `/api/doctor/list`, `/api/drug/list`, etc.
- Verify response has `success: true`
- Check headers for token inclusion

---

## Common Issues & Troubleshooting

### Issue: "user is not defined" or "userData is not defined"

**Problem**: Accessing properties without checking if object exists

**Solution**:
```jsx
// ❌ Causes error
const name = user.name;

// ✅ Safe access
const name = user ? user.name : 'Guest';
// or
const name = user?.name || 'Guest';
```

---

### Issue: Cart not persisting after refresh

**Problem**: Cart state is lost on page reload

**Solution**: Cart is fetched from backend on component mount in the useEffect hook

```jsx
// Ensure this is working:
useEffect(() => {
  if (user && userToken) {
    fetchCart();
  }
}, [user, userToken]);
```

---

## Performance Optimization

### 1. Memoize Context Values

```jsx
// Current implementation (fine for this app size)
const value = { ... };

// For larger apps, consider:
const value = useMemo(() => ({
  doctors,
  user,
  // ... other values
}), [doctors, user]);
```

### 2. Split Context if Needed

```jsx
// If app grows large, split into multiple contexts:
// UserContext.jsx - for user/auth
// CartContext.jsx - for cart management
// DataContext.jsx - for doctors/drugs

// Then combine in providers
```

### 3. Use Context Selectors (Library)

```jsx
// Consider useContextSelector library for performance
import { useContextSelector } from 'use-context-selector';

// Then use selectors
const user = useContextSelector(AppContext, state => state.user);
```

---

## Setup & Configuration

### Environment Variables Required

```bash
# .env file
VITE_BACKEND_URL=http://localhost:5000
```

### In main.jsx/App.jsx

```jsx
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      {/* Your app routes and components */}
    </AppContextProvider>
  );
}

export default App;
```

### In React Entry Point

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
)
```

---

## API Integration Patterns

### Common Request Patterns

#### With Admin Token
```jsx
await axiosInstance.get("/api/user/get-profile", {
  headers: { token }
});
```

#### With User Token
```jsx
await axiosInstance.get("/api/cart/get", {
  headers: { Authorization: `Bearer ${userToken}` }
});
```

### Error Handling

All functions handle errors consistently:
```jsx
try {
  const { data } = await axiosInstance.get(...);
  
  if (data.success) {
    // Update state
    setData(data.result);
  } else {
    toast.error(data.message);
  }
} catch (error) {
  console.error("Error:", error);
  toast.error(error.message);
}
```

---

## Cart Calculation Examples

### Example Calculation

Given:
```jsx
cartItems = { drugId1: 2, drugId2: 1 }
drugs = [
  { _id: 'drugId1', offerPrice: 50 },
  { _id: 'drugId2', offerPrice: 100 }
]
```

Calculations:
```jsx
getCartCount()   // 2 + 1 = 3 items
getCartAmount()  // (50 × 2) + (100 × 1) = 200 EGP
```

---

## Related Documentation

- [React Context API](https://react.dev/reference/react/useContext)
- [React Hooks](https://react.dev/reference/react)
- [Axios Documentation](https://axios-http.com)
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## Contributing

When modifying AppContext:

1. **Update Tests**: Ensure all context methods are tested
2. **Document Changes**: Update this README with new functions
3. **Backward Compatibility**: Don't break existing component usage
4. **Performance**: Consider impact of new state/functions
5. **Error Handling**: Always handle API errors gracefully
6. **Type Safety**: Consider adding TypeScript interfaces

---

## Summary Table

| Function | Purpose | Returns | Async |
|---|---|---|---|
| `getDoctorsData()` | Fetch all doctors | void | Yes |
| `getChatbotContext()` | Fetch chatbot data | void | Yes |
| `fetchDrugs()` | Fetch all drugs | void | Yes |
| `loadUserProfileData()` | Load admin profile | void | Yes |
| `loadUserProfile()` | Load user profile | void | Yes |
| `fetchCart()` | Load cart from backend | void | Yes |
| `syncCart()` | Sync cart to backend | void | Yes |
| `addToCart()` | Add item to cart | void | Yes |
| `updateCartItem()` | Update item quantity | void | Yes |
| `removeFromCart()` | Remove item from cart | void | Yes |
| `getCartCount()` | Get total items | number | No |
| `getCartAmount()` | Get total price | number | No |
| `clearCart()` | Empty cart | void | Yes |

---

## Performance Notes

- Context updates cause all consumers to re-render
- Consider splitting for larger apps
- Use React DevTools Profiler to check render times
- Memoize consumer components if needed

---

## Next Steps

1. Review the quick reference guide in `docs/README.md`
2. Check AppContext.jsx implementation
3. Test with browser DevTools
4. Monitor network tab for API calls
5. Profile performance with React DevTools
