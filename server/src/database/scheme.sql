CREATE DATABASE iclean;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  cpf CHAR(11) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(255),
  PRIMARY KEY(cpf),
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS ads(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  description VARCHAR(255),
  availability VARCHAR(255) NOT NULL,
  status BOOLEAN NOT NULL,
  ucpf CHAR(11),
  PRIMARY KEY(id),
  FOREIGN KEY(ucpf) REFERENCES users(cpf) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS services(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  date DATE,
  status BOOLEAN NOT NULL,
  cpf_provider CHAR(11),
  cpf_customer CHAR(11),
  ad_id UUID,
  PRIMARY KEY(id),
  FOREIGN KEY(cpf_provider) REFERENCES users(cpf) ON DELETE SET NULL,
  FOREIGN KEY(cpf_customer) REFERENCES users(cpf) ON DELETE SET NULL,
  FOREIGN KEY(ad_id) REFERENCES ads(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS candidates(
  ucpf CHAR(11),
  ad_id UUID,
  PRIMARY KEY(ucpf, ad_id),
  FOREIGN KEY(ucpf) REFERENCES users(cpf) ON DELETE CASCADE,
  FOREIGN KEY(ad_id) REFERENCES ads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings(
  ucpf CHAR(11),
  totalRatingsProvider INT NOT NULL DEFAULT 0,
  ratingCounterProvider INT NOT NULL DEFAULT 0,
  totalRatingsCustomer INT NOT NULL DEFAULT 0,
  ratingCounterCustomer INT NOT NULL DEFAULT 0,
  PRIMARY KEY(ucpf),
  FOREIGN KEY(ucpf) REFERENCES users(cpf) ON DELETE CASCADE
);
