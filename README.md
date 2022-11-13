# iClean

iClean é um sistema desenvolvido com o objetivo de facilitar a procura, o contato e a contração de serviços gerais para residências. 



Desenvolvido por:<br>
👨‍💻 Gabriel Geovanni Moreira Silva<br>
👨‍💻 Matheus Oliveira Vilela<br>

Banco de Dados I - Universidade Federal de Ouro Preto

---

## Technologies
O projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- Docker
- PostgreSQL
- Express
- React

---

## How to use

Para clonar e rodar essa aplicação é necessário ter o git, docker, node v16.8.0 ou superior instalados na sua máquina.

```
# Clone this repository
$ git clone https://github.com/gabriel-geovanni/iClean.git

# Go into the reposity
$ cd iClean
```

```
# Create PostgreSQL container
$ sudo docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

```
# Go to docker terminal
$ docker exec -t pg bash

# Go to PostgreSQL container
$ psql -U root

# Then create the database and tables using scheme.sql to run the commands
```

Run Server:

```
# open server
$ cd server

# Install dependencies
$ npm install or yarn

# Start Server
$ yarn dev

```
Run front:
```
# open front
$ cd front

# Install dependencies
$ npm install or yarn

# Start front
$ yarn dev
```
