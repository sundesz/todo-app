# **Todo App**

User can **Sign up**, **Sign in**, **Sign out**<br>
Logged in user can **Create, marked as important and done, delete and sort tasks by filters**<br>
Logged in information are stored in cookies

**NodeJS, Express, React, Redux, Typescript, Postgresql, Docker, Unit testing(JEST) and End to End testing(Cypress)**
<br>
<br>

# **After cloning**

run **npm install** on both server and client
<br>
create **.env file** on both server and client using .env.template

<br>
<br>

# Client

## Scripts

**npm start**: To start frontend<br>
**npm run test:e2e**: To start test<br>
(please start the server in test-mode using npm run start:test first )

<br>

# Server

## scripts

**NOTE:** run **docker-compose up --build** command, if you want to use docker postgres
<br>
<br>
**npm run dev**: To start server<br>
**npm run test**: To start test<br>
**npm run start:test**: To start server for client to test

## Info

1. To test you need to **create database todoapptest manually** if you use docker postgres
2. You can use docker to run the application. <br>
   Just use the command **docker-compose up --build** from main directory and Use this link to open the app
   [http://localhost:8080](http://localhost:8080)
