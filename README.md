# E-Commerce Backend

This is the backend for Rahul's E-Commerce app, built for learning purposes. The API provides basic e-commerce functionality such as user authentication, product management, cart management, and order processing. The backend is built using the [Hono framework](https://hono.dev/) and designed for simplicity and clarity.

---

## Routes

### Health Check

- **GET** `/api/health`: Check if the backend is running.

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login for an existing user.

### Product Management

- **GET** `/api/products/`: Get a list of all products.
- **GET** `/api/products/:id`: Get details of a specific product by its ID.
- **POST** `/api/products/`: Add a new product.
- **PUT** `/api/products/:id`: Update an existing product by its ID.
- **DELETE** `/api/products/:id`: Delete a product by its ID.

### Cart Management

- **POST** `/api/cart/add`: Add an item to the cart.
- **GET** `/api/cart/`: View the current cart.
- **PUT** `/api/cart/update`: Update an item in the cart.
- **DELETE** `/api/cart/remove`: Remove an item from the cart.

### Order Management

- **POST** `/api/orders/create`: Place a new order.
- **GET** `/api/orders/`: View all orders.
- **DELETE** `/api/orders/cancel`: Cancel an order.

## Review management

[WIP]

## How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/rahulv119/e-com-backend.git
    ```
