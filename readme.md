# ZombieMarkt e-commerce

## Description

### These are **two** front end applications e-commerce + **inventory manager**(CRUD), that interacts between each other via a third application, a nodeJs rest api server; all together emulates on a very small scale how i imagine a propper shopping application works. on One hand the **Inventory Manager** perfoms CRUD operations such as creating products, edit them, and deleting products; and the **e-commerce** creates an order entry and creates users

---

## Installation

### Fork / Clone this repository, then **you must cd into each application folder and run**

> npx install

---

## _Application A_ - **Inventory Manager - Frontend**💻

### This application is meant to be used by the warehouse worker of the shop, where they would be able to inbound incomming products, outbound them when they expire, and for this demonstration i included other pages to check all the orders that users have created on the e-commerce, as well as listing all the existing users and also all products. **The delete page works fine but when deleting an item, it might break some pages of the e-commerce that feed from that product, ex: Profile page**.

---

## _Application B_ - **E-Commerce - Frontend**💻

### This application is used by **Users** to create orders, signup, login, and they can also **post comments** on different products under the product detail page, as well as **mark some product as their favorite**, _as many favorites as they want_. The add to cart functionallity is the same as my previous app (rich-simulator), as well as the checkout page, only one product gets added to the cart; and if the addToCart button gets triggered again, the product then is removed from cart (to avoid duplicate products on the cart)

---

## _Application C_ - **Node server - Backend**💾

### The **server** side of my Zombiemakrt app (MongoDB, Express, React, Node.js) application is built using _Node.js_ with _Express_ framework. It serves functions based on different endpoints, which are implemented following the **REST** (Representational State Transfer) architectural style; and by using _mongoose's_ schemas and methods perfom the necessary operations to push, edit or delete documents in the mongoDB database.

### **Environmental variables**

_The server uses the following .env variables:_

```
DB=mongodb+srv://yourUser:yourPassword@yourCluster.mongoDB
CLOUD_NAME=yourCloudName
API_KEY= cloudinary api key
API_SECRET= cloudinary encription

SECRET= enciption variable for json web tokens
COOKIE_KEY= encription variable for cookies

GOOGLE_CLIENT_ID= google app id on google cloud storage
GOOGLE_CLIENT_SECRET= encription variable for google
```

### **Dependencies**

The following dependencies are needed for the server

```
express: a fast and flexible web framework for Node.js.
colors: a library for adding colors to console output.
express-session: a middleware for managing user sessions.
cookie-session: a middleware for managing user sessions using cookies.
connectDB: a custom module for connecting to MongoDB database.
cloudinary: a library for cloud-based image and video management.
passport: a library for authentication.
cors: a middleware for enabling Cross-Origin Resource Sharing.
dotenv: a module for loading environment variables from a .env file.
```
