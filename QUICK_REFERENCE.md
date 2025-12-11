# IP Shield - Quick Reference Guide

Panduan cepat untuk referensi saat coding IP Shield Extension.

---

## Table of Contents

1. [Common Patterns](#common-patterns)
2. [State Management Cheat Sheet](#state-management-cheat-sheet)
3. [API Integration Snippets](#api-integration-snippets)
4. [Event Handlers](#event-handlers)
5. [Conditional Rendering](#conditional-rendering)
6. [Common Mistakes](#common-mistakes)
7. [TypeScript Types](#typescript-types)
8. [Useful Utilities](#useful-utilities)

---

## Common Patterns

### Pattern 1: Add Item to Array

```typescript
// Add to START of array
setItems(prev => [newItem, ...prev]);

// Add to END of array
setItems(prev => [...prev, newItem]);

// Add multiple items
setItems(prev => [...prev, ...newItems]);
```

### Pattern 2: Update Item in Array

```typescript
// Update by ID
setItems(prev =>
  prev.map(item =>
    item.id === targetId
      ? { ...item, status: "PROTECTED" }
      : item
  )
);

// Update multiple properties
setItems(prev =>
  prev.map(item =>
    item.id === targetId
      ? { 
          ...item, 
          status: "PROTECTED",
          timestamp: Date.now(),
          verified: true
        }
      : item
  )
);
```

### Pattern 3: Remove Item from Array

```typescript
// Remove by ID
setItems(prev => prev.filter(item => item.id !== targetId));

// Remove by condition
setItems(prev => prev.filter(item => item.status !== "DELETED"));

// Remove first item
setItems(prev => prev.slice(1));

// Remove last item
setItems(prev => prev.slice(0, -1));
```

### Pattern 4: Update Object State

```typescript
// Update single property
setUser(prev => ({ ...prev, name: "New Name" }));

// Update multiple properties
setUser(prev => ({
  ...prev,
  name: "New Name",
  email: "new@email.com",
  verified: true
}));

// Update nested property
setUser(prev => ({
  ...prev,
  profile: {
    ...prev.profile,
    avatar: "new-url.jpg"
  }
}));
```

### Pattern 5: Toggle Boolean

```typescript
// Simple toggle
setIsOpen(prev => !prev);

// Toggle with effect
setIsMonitoring(prev => {
  const newValue = !prev;
  console.log(`Monitoring ${newValue ? 'started' : 'stopped'}`);
  return newValue;
});
```

### Pattern 6: Async Operation

```typescript
const handleAction = async () => {
  try {
    // 1. Set loading state
    setIsLoading(true);
    
    // 2. Perform async operation
    const result = await apiCall();
    
    // 3. Update state with result
    setData(result);
    
    // 4. Show success
    setSuccess(true);
  } catch (error) {
    // 5. Handle error
    console.error(error);
    setError(error.message);
  } finally {
    // 6. Clear loading state (runs always)
    setIsLoading(false);
  }
};
```

### Pattern 7: Conditional API Call

```typescript
const verifyAndRegister = async (content) => {
  // Step 1: Verify
  const verification = await verifyContent(content);
  
  // Step 2: Conditional registration
  if (verification.status === "ORIGINAL") {
    const registration = await registerIP(content);
    return { verified: true, registered: registration };
  } else {
    return { verified: true, registered: false, reason: verification.status };
  }
};
```

---

## State Management Cheat Sheet

### Create State

```typescript
// String
const [name, setName] = useState("");
const [name, setName] = useState("default");

// Number
const [count, setCount] = useState(0);
const [age, setAge] = useState(25);

// Boolean
const [isActive, setIsActive] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(true);

// Array
const [items, setItems] = useState([]);
const [items, setItems] = useState([1, 2, 3]);

// Object
const [user, setUser] = useState({});
const [user, setUser] = useState({ name: "John", age: 30 });

// Null/Undefined
const [data, setData] = useState(null);
const [user, setUser] = useState<User | null>(null);

// Lazy initialization (untuk operation yang expensive)
const [client, setClient] = useState(() => getYakoaClient());
```

### Update State

```typescript
// Direct value
setCount(5);
setName("John");
setIsActive(true);

// Function update (dapat access previous value)
setCount(prev => prev + 1);
setName(prev => prev.toUpperCase());
setIsActive(prev => !prev);

// Complex update
setUser(prev => ({
  ...prev,
  lastLogin: Date.now(),
  sessionCount: prev.sessionCount + 1
}));
```

### Multiple States vs Single Object

```typescript
// OPTION 1: Multiple states (jika independent)
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(0);

// OPTION 2: Single object (jika related)
const [user, setUser] = useState({
  name: "",
  email: "",
  age: 0
});

// Update single object state
setUser(prev => ({ ...prev, name: "John" }));
```

---

## API Integration Snippets

### Basic API Call

```typescript
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
```

### POST Request

```typescript
const sendData = async (payload) => {
  try {
    const response = await fetch("https://api.example.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST error:", error);
    throw error;
  }
};
```

### Yakoa Verification

```typescript
const verifyWithYakoa = async (url, type) => {
  const yakoaClient = getYakoaClient();
  
  const result = await yakoaClient.verifyContent({
    contentUrl: url,
    contentType: type,
    title: "My Content"
  });
  
  // Map to UI status
  if (result.isInfringing) return "BRAND_IP_DETECTED";
  if (result.matchedOwner) return "ALREADY_REGISTERED";
  if (result.isOriginal) return "ORIGINAL";
  return "ERROR";
};
```

### Story Protocol Registration

```typescript
const registerOnStory = async (metadata) => {
  const storyClient = getStoryClient();
  
  if (!storyClient.isInitialized()) {
    // Demo mode
    return {
      success: true,
      ipId: "0xMOCK...",
      txHash: "0xMOCK..."
    };
  }
  
  // Real registration
  const result = await storyClient.registerIPAsset(
    metadata.ipMetadata,
    metadata.nftMetadata,
    metadata.ipUri,
    metadata.nftUri,
    metadata.licenseTerms
  );
  
  return result;
};
```

---

## Event Handlers

### onClick

```typescript
// Simple handler
<button onClick={() => alert("Clicked!")}>
  Click Me
</button>

// Handler with parameter
<button onClick={() => handleDelete(item.id)}>
  Delete
</button>

// Handler accessing event
<button onClick={(e) => {
  e.stopPropagation(); // Prevent bubbling
  handleClick();
}}>
  Click
</button>

// Named function handler
const handleClick = () => {
  console.log("Clicked");
};

<button onClick={handleClick}>
  Click Me
</button>
```

### onChange

```typescript
// Input text
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Checkbox
<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// Select dropdown
<select
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>

// File input
<input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }}
/>
```

### onSubmit

```typescript
// Form submission
<form onSubmit={(e) => {
  e.preventDefault(); // Prevent page reload
  handleSubmit();
}}>
  <input value={name} onChange={(e) => setName(e.target.value)} />
  <button type="submit">Submit</button>
</form>

// With form data
const handleSubmit = (e) => {
  e.preventDefault();
  
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value
  };
  
  // Process form data
  processForm(formData);
};
```

### Custom Events

```typescript
// Mouse events
<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onClick={() => handleClick()}
  onDoubleClick={() => handleDoubleClick()}
>
  Hover or click me
</div>

// Keyboard events
<input
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }}
  onKeyPress={(e) => console.log(e.key)}
/>

// Focus events
<input
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

---

## Conditional Rendering

### If Statement

```typescript
// Simple if
{isLoggedIn && <Dashboard />}

// If-else
{isLoggedIn ? <Dashboard /> : <Login />}

// Multiple conditions
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataView data={data} />}
```

### Switch/Case Alternative

```typescript
// Using object lookup
const statusComponents = {
  ORIGINAL: <Badge color="green">Original</Badge>,
  BRAND_IP: <Badge color="orange">Brand IP</Badge>,
  REGISTERED: <Badge color="red">Registered</Badge>,
  PROCESSING: <Badge color="blue">Processing</Badge>
};

// Render
{statusComponents[content.status]}

// Or with function
const renderStatus = (status) => {
  switch (status) {
    case "ORIGINAL":
      return <Badge color="green">Original</Badge>;
    case "BRAND_IP":
      return <Badge color="orange">Brand IP</Badge>;
    case "REGISTERED":
      return <Badge color="red">Registered</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

{renderStatus(content.status)}
```

### List Rendering

```typescript
// Basic map
{items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))}

// With index
{items.map((item, index) => (
  <div key={item.id}>
    {index + 1}. {item.name}
  </div>
))}

// Filter then map
{items
  .filter(item => item.status === "ACTIVE")
  .map(item => (
    <div key={item.id}>{item.name}</div>
  ))
}

// Empty state
{items.length === 0 ? (
  <EmptyState message="No items found" />
) : (
  items.map(item => <Item key={item.id} {...item} />)
)}
```

---

## Common Mistakes

### Mistake 1: Direct State Mutation

```typescript
// WRONG
const items = [...detectedContent];
items.push(newItem);
setDetectedContent(items);

// CORRECT
setDetectedContent(prev => [...prev, newItem]);
```

### Mistake 2: Missing Key in Lists

```typescript
// WRONG (React warning!)
{items.map(item => (
  <div>{item.name}</div>
))}

// CORRECT
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### Mistake 3: Missing Dependency in useEffect

```typescript
// WRONG (stale closure)
useEffect(() => {
  console.log(count); // Always logs initial value
}, []); // Missing count in deps

// CORRECT
useEffect(() => {
  console.log(count); // Logs current value
}, [count]);
```

### Mistake 4: Async in useEffect

```typescript
// WRONG
useEffect(async () => {
  const data = await fetchData(); // Error!
}, []);

// CORRECT
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };
  loadData();
}, []);
```

### Mistake 5: Not Handling Async Errors

```typescript
// WRONG
const handleClick = async () => {
  const result = await apiCall(); // What if this fails?
  setData(result);
};

// CORRECT
const handleClick = async () => {
  try {
    const result = await apiCall();
    setData(result);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};
```

### Mistake 6: Infinite Loop in useEffect

```typescript
// WRONG (infinite loop!)
useEffect(() => {
  setCount(count + 1); // Triggers re-render → triggers effect → infinite loop
});

// CORRECT
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // Run once

// Or with proper dependency
useEffect(() => {
  if (shouldUpdate) {
    setCount(prev => prev + 1);
  }
}, [shouldUpdate]);
```

---

## TypeScript Types

### Basic Types

```typescript
// Primitives
const name: string = "John";
const age: number = 30;
const isActive: boolean = true;
const data: null = null;
const value: undefined = undefined;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["John", "Jane"];

// Objects
const user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Functions
const greet: (name: string) => string = (name) => `Hello ${name}`;
const calculate: (a: number, b: number) => number = (a, b) => a + b;

// Any (avoid if possible)
const anything: any = "can be anything";

// Union types
const id: string | number = "123" or 123;
const status: "ORIGINAL" | "BRAND_IP" | "REGISTERED" = "ORIGINAL";
```

### Interface vs Type

```typescript
// Interface (untuk objects)
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// Type (lebih flexible)
type Status = "ORIGINAL" | "BRAND_IP" | "REGISTERED";
type ID = string | number;

type UserWithStatus = User & { status: Status }; // Intersection
```

### Function Types

```typescript
// Function parameter types
function greet(name: string): string {
  return `Hello ${name}`;
}

// Arrow function with types
const add = (a: number, b: number): number => a + b;

// Optional parameters
const greet = (name: string, age?: number): string => {
  return age ? `${name}, ${age}` : name;
};

// Default parameters
const greet = (name: string, greeting: string = "Hello"): string => {
  return `${greeting}, ${name}`;
};

// Async function
const fetchData = async (): Promise<Data> => {
  const response = await fetch(url);
  return response.json();
};
```

### Component Props Types

```typescript
// Props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

// Component with typed props
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Usage
<Button label="Click Me" onClick={() => console.log("Clicked")} />
```

---

## Useful Utilities

### Delay/Sleep

```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Usage
await delay(1000); // Wait 1 second
```

### Generate Random ID

```typescript
const generateId = () => Date.now() + Math.random().toString(36).substring(2);

// Usage
const id = generateId(); // "1702066789123abc"
```

### Format Date

```typescript
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Usage
formatDate(new Date()); // "Dec 8, 2025"
```

### Debounce

```typescript
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Usage
const handleSearch = debounce((query: string) => {
  console.log("Searching:", query);
}, 500);
```

### Local Storage Helpers

```typescript
// Save to localStorage
const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Load from localStorage
const loadFromStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Remove from localStorage
const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Usage
saveToStorage('user', { name: 'John', age: 30 });
const user = loadFromStorage('user');
removeFromStorage('user');
```

### Copy to Clipboard

```typescript
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Usage
copyToClipboard("0x123abc...");
```

### Hash String (SHA-256)

```typescript
const hashString = async (str: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Usage
const hash = await hashString("my content");
console.log(hash); // "a665a45920422f..."
```

### Format Currency

```typescript
const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Usage
formatCurrency(45.20); // "$45.20"
```

### Truncate String

```typescript
const truncate = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

// Usage
truncate("0x123456789abcdef", 10); // "0x12345..."
```

---

## Quick Debugging

### Console Logging

```typescript
// Basic log
console.log("Message");

// Multiple values
console.log("User:", user, "Age:", age);

// Object shorthand
console.log({ user, age, isActive });

// Table (for arrays of objects)
console.table(users);

// Group
console.group("User Details");
console.log("Name:", user.name);
console.log("Email:", user.email);
console.groupEnd();

// Time measurement
console.time("apiCall");
await apiCall();
console.timeEnd("apiCall"); // "apiCall: 234.56ms"

// Conditional log
const DEBUG = true;
DEBUG && console.log("Debug message");
```

### React DevTools

```typescript
// Named components (easier to debug)
const MyComponent = () => { ... };
export default MyComponent;

// Display name
MyComponent.displayName = "MyComponent";

// Debug value in DevTools
useDebugValue(isOnline ? "Online" : "Offline");
```

---

## Performance Tips

### useMemo

```typescript
// Expensive calculation
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.value, 0);
}, [items]); // Only recalculate when items change
```

### useCallback

```typescript
// Memoize callback function
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []); // Function reference stays same

// With dependencies
const handleDelete = useCallback((id) => {
  deleteItem(id);
}, [deleteItem]); // Recreate only if deleteItem changes
```

### React.memo

```typescript
// Prevent unnecessary re-renders
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>;
});

// With custom comparison
const ExpensiveComponent = React.memo(
  ({ data }) => <div>{data.name}</div>,
  (prevProps, nextProps) => prevProps.data.id === nextProps.data.id
);
```

---

**Quick Reference Complete! Bookmark this for quick lookup during development.**
