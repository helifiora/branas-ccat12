DROP TABLE IF EXISTS passenger;
DROP TABLE IF EXISTS driver;

CREATE TABLE passenger (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  document TEXT NOT NULL
);

CREATE TABLE driver (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  document TEXT NOT NULL,
  car_plate TEXT NOT NULL
);