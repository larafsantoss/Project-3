CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_in_cents INTEGER NOT NULL, 
  image_url TEXT
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id serial PRIMARY KEY,
  customer_name text NOT NULL,
  customer_address text NOT NULL,
  total_amount integer NOT NULL
);

DROP TABLE IF EXISTS order_details;
CREATE TABLE order_details (
  id serial PRIMARY KEY,
  order_id integer REFERENCES orders(id),
  product_id integer REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price_in_cents integer NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT
)
