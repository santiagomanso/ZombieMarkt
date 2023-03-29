# Inventory Manager - Server 💾

## Description

### This is the frontend application that a warehouse worker would use in order to modify the products that our company sells, among those operations, the employee would find inbounding products(create), inventory check (search/edit products), and delete products.

_I included in this application a screen(page) to display all users, all orders, all products so that anyone using this app could have a more pleasant experience._

---

## **Installation**

```
zombiemarkt/inventory-manager: npm install
```

### **Dependencies**

The following dependencies are needed for the inventory-manager

```
axios:   package used for making HTTP requests and handling responses.
react-router-dom:  A library for routing in React applications, providing navigation between different pages
tailwindcss: A utility-first CSS framework that provides a set of pre-defined CSS classes.
use-debounce: package to help improve performance by reducing the number of function calls triggered by user inputs.
```

---

## **Things i learnt**

### The following are some examples of things that made me feel happy about understanding how they work, or how to implement.

---

### 🔥**Implement use-debounce to minimize api queries**: i wanted to create a modal component that when mounted, the user would be ready to start typing a name, or a EAN (barcode on products with barcode scanner) and with no submit button, it should trigger a single query to my API. _⚠️Problem_: in order to be able to put aside the submit button, the api call must be done on a **onChange** event, thus resulting in multiple queries due to the fact that every typed letter would trigger the api-call.

### _✅Solution_: install use-debounce and have the useEffect() listen to changes in the **debouncedText** and only then trigger the api-call

src/components/modal/Modal.jsx

```
const [input, setInput] = useState('')
const [debouncedText] = useDebounce(input, 1000)
const inputRef = useRef(null)

useEffect(() => {
    inputRef.current.focus()
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(!active)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    //set data gets passed to the component to set the data after fetching
    if (debouncedText.length > 0) {
      UseGetProducts(debouncedText, setData, setError)
    }
}, [debouncedText, input])
```

src/utils/getProducts.js

```
const getProducts = (arg, setData, setError) => {
  const fetchData = async (url) => {
    const { data } = await axios.get(url)
    // console.log('data: ', data)
    setData(data)
  }

  if (isStrOrNum(arg) === 'string') {
    fetchData(`http://localhost:5500/api/products/name/${arg}`)
  } else {
    fetchData(`http://localhost:5500/api/products/ean/${arg}`)
  }
}
```

#### a state input is declared, as well as a debounced state, initialized to the input value, and with a 1000ms delayed to be setted: meaning that after the user types and store letters or numbers into the input state, the debounced text will wait for 1s to fully set the string with the letters or numbers the user has typed. after the **debouncedText** value mutates, it gets picked up by the useEffect and after checking if there is something inside of debouncedText, it fires a helper function with the debouncedText, the setData, and setError functions. From there the helper function will determine if the first character of the argument is a string or is a number, **(A) if it is a number** it will use axios to post a request to getByEan, for the backend to search a product by using the barcode on the product, **(B)If the argument is a string** it will use axios to post a request to getByName, where the backend will look for something related to the name of the product based on what the user typed on the input

---
