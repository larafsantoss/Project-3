CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_in_cents INTEGER NOT NULL, 
  image_url TEXT
);

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT
);