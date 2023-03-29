# E-Commerce - Frontend 💻

## Description

### This is the front end application that a Client would use to place an order and buy products from our company.

## **Installation**

```
zombiemarkt/e-commerce: npm install
```

---

### **Dependencies**

The following dependencies are needed for the server

```
axios:   package used for making HTTP requests and handling responses.
js-cookie: A library for handling cookies in the browser.
react-router-dom:  A library for routing in React applications, providing navigation between different pages
react-typewriter-effect: A React component for creating a typewriter effect, allowing text to be animated
tailwindcss: A utility-first CSS framework that provides a set of pre-defined CSS classes.
```

---

## **What i learnt whilist coding this app**

### The following are some examples of things that made me feel happy about understanding how they work, or how to implement.

---

### 🔥**Google Oauth2.0 implementation** : to achieve the popular login using google, i added the same button i used on my rich-simulator app, the functionallity is the following: the button triggers a function that resides on the userContext component. Problem: react-router-dom does not provide functionallity to redirect to an external url (outside of the localhost), so i had to use the window.location

```
  const loginGoogle = async () => {
    window.location.href = 'http://localhost:5500/api/auth/google'
  }
```

### Now google will prompt the user with the window to select the desirable account to proceed, after that the user will be redirect back to my backend bearing the google profile, where i create a new user and redirect from the backend to the root path of the e-commerce app. **Notice: at this point the redirect will bring along a cookie that is set into the browser**. Now, by default i have a useEffect() with no dependencies array, that translate to a componentDidMount(), meaning that when the component (the userContext) gets mounted it will try to pull a token either from the localStorage(normal email/password login), or from the cookies (google login), and if the token exists it will then trigger a loginWithToken function that will authenticate the user based on that JWT(email/password) or the Cookie(googleLogin)

<img src="https://raw.githubusercontent.com/santiagomanso/ZombieMarkt/main/FlowChart-Google-Oauth-20.drawio.png"
     alt="Google-Oauth-20"
     style="float: left; margin-right: 10px;" />

```
  useEffect(() => {
    const token = getTokenFromStorage()
    if (token) {
      loginWithToken(token)
    }
  }, [])
```

---

### 🔥**Avoid unnecessary API calls**: on the cartScreen, if the buttons + and - where to trigger an API call per click, it could potentially result in many problems: if the hosting platforms charges the company PER API CALL, the clicking will lead into a **severe money lost** for the company, possible lag and lack of sync when trying to update/modify multiple products. **My Solution**: when ever the user clicks on the + and - buttons, i increment a field on the product object called **quantity** and it cannot be more that the product.stock and less than 1, in this way the user only modifies the products (multiples) on the front end, and after everything is ready, a single API-call gets trigger to post 1 order and then the server recieves and array of prodcts with the field quantity that uses to set the stock to the difference between the substraction between quantity and stock.

```
const handleClick = (operation, item) => {
    switch (operation) {
      case '+': {
        if (item.quantity === undefined || item.quantity < item.countInStock) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) + 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      case '-': {
        if (item.quantity === undefined || item.quantity > 1) {
          const updatedCart = [...cart]
          const itemIndex = updatedCart.findIndex(
            (cartItem) => cartItem._id === item._id,
          )
          const updatedItem = { ...updatedCart[itemIndex] }
          updatedItem.quantity = (updatedItem.quantity || 0) - 1
          updatedCart[itemIndex] = updatedItem
          setCart(updatedCart)
        }
        break
      }

      default:
        break
    }
  }
```

### **Related problem**: when navigating to a different page and returning to this cartScreen the quantities would be gone because at first i was not saving (updating) the new product item into the cart context, so i had to find a way of updating the whole cart.

### **Related problem#2**: when first loading the component there is no quantity property inside of the items of the cart, so i use the useEffect() hook with no dependency array, like componentDidMount() to map through the cart and add the quantity = 1 property to all elements of the cart.

```
  useEffect(() => {
    //NOTE - add property quantity to EVERY item, only when there are items inside
    if (cart.length > 0) {
      const updatedCart = cart.map((item) => {
        if (item.quantity === undefined) {
          return { ...item, quantity: 1 }
        } else {
          return item
        }
      })
      setCart(updatedCart)
    }
  }, [])
```

---
