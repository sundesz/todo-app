# **Todo App**

# Client

## Scripts

**npm start**: To start frontend<br>
**npm run test:e2e**: To start test<br>
(please start the server in test-mode using npm run start:test first )

<br>
<br>
<br>

# Server

## scripts

**NOTE** Please create a .env file using .env.template
<br>
<br>
**npm run dev**: To start application<br>
&nbsp;&nbsp;&nbsp;**This will start both server and client**<br>
**npm run test**: To start test<br>
**npm run start:test**: To start server for client to test

## Info

1. Check if port 5432 is used already or not

2. If you have any problem with docker-compose you can also use your local postgres<br>
   If you use local postgres please create the table first (todoapp)

<br>
<br>
<br>

# For test

I am little confuse Should i create new image for test or just use the same image with different table name. So for now I just use the existing image.

## **NOTE**: Please create a table **todoapptest** first. Before you start the test.
