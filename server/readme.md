# Server 💾

## Description

### This is the backend application (server) that process the requests coming from both frontend applications (e-commerce / inventory-manager).

_The seeder file was used as a rapid way to automatically input data and quickly populate products/users collections_

---

## **Installation**

```
zombiemarkt/server: npx install
```

### **Environmental variables**

_The server uses the following .env variables:_

```
DB=mongodb+srv://yourUser:yourPassword@yourCluster.mongoDB
CLOUD_NAME=yourCloudName

SECRET= enciption variable for json web tokens
COOKIE_KEY= encription variable for cookies

GOOGLE_CLIENT_ID= google app id on google cloud storage
GOOGLE_CLIENT_SECRET= encription variable for google
```

### **Dependencies**

The following dependencies are needed for the server to run

```
express: a fast and flexible web framework for NodeJs.
colors: a library for adding colors to console output.
express-session: a middleware for managing user sessions.
cookie-session: a middleware for managing user sessions using cookies.
connectDB: a custom module for connecting to MongoDB database.
cloudinary: a library for cloud-based image and video management.
passport: a library for authentication.
cors: a middleware for enabling Cross-Origin Resource Sharing.
dotenv: a module for loading environment variables from a .env file.
```

---

## **Things i learnt**

### The following are some examples of things that made me feel happy about understanding how they work, or how to implement.

### **Google Oauth2.0 implementation** : to achieve the popular login using google, i used a middleware called _PassportJS_ and the _passport-google-oath20_ strategy, and what it does is redirect the browser to google, to a specific endpoint linked to the google_client_id application that was registered on google cloud, and the user will then choose the desired account to proceed further, the user will then be redirected (from google back to my server) with the google profile, where i instantiate a new User object from the UserModel schema (mongoose) and i will "craft" the newUser object with the iformation that google has sent to my backend. At thie point i must now redirect the request from my backend, towards the frontend (e-commerce) with the user that i just created (with previus validation if the user has already signed up and has a googleId account). **I also encountered information that suggests that the vast majority of companies buy/hire oauth libraries/services**.

<img src="https://raw.githubusercontent.com/santiagomanso/ZombieMarkt/main/FlowChart-Google-Oauth-20.drawio.png"
     alt="Google-Oauth-20"
     style="float: left; margin-right: 10px;" />

Flowchart of how i understood and implemented oauth

---

### **Updating stock from frontend**:\* \*This was the most satisfactory process i overcame.

### The endpoint of this feature is as follows

```
endpoint:    /api/orders/newOrder
orderRouter: post('/newOrder', authMiddleware, createOrder)
```

### The router will pass the req to my custom authMiddleware, to undergo a verification process of the JWT (json web token), if the verification is true, the next() function is called to invoke the next function, **createOrder**. Here the orderController will fire-up the createOrder function that extracts information comming from the req.body, among the most important we will find an array of products id's (come as **ordersItems**), the whole array of products (come as **cart**). Now the backend will map through the cart and perform the stock update operation

```
cart.map(async (item) => {
    // console.log('item', item)
    await productModel.findByIdAndUpdate(
        { _id: item._id },
        { $set: { countInStock:
                    item.countInStock -
                    item.quantity
                }
        },
        { new: true },
        )
      })
```

### Now is time to create a new order

```
const order = new orderModel({
    user: req.user._id
    shippingAdress: shippingAdress,
    quantity: orderItems.length
    price: price,
    orderItems: orderItems,
    createdAt: moment().format('DD-MM-YYYY
    HH:mm'),
})
```

### The order is filled with the data comming from the req.body, and now we push this new order to the user that has made this order, at this point we already have access to the order.\_id so we can push directly into the array of orders from our user

```
//PUSH ORDER TO EXISTING USER
await userModel.findByIdAndUpdate(
    req.user._id,
    { $push: { orders: order._id } },
    { new: true },
)
```

### All is left now is to send a response to the frontend.

```
const savedOrder = await order.save()
res.status(201).json({
    msg: 'Order created successfully',
    order: savedOrder,
})
```

<img src="https://raw.githubusercontent.com/santiagomanso/ZombieMarkt/main/server/createOrder%20flowchart.jpg"
     alt="createOrder flowchart"
     style="float: left; margin-right: 10px;" />
flowchart of how the create order functions works
