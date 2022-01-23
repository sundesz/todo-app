# todo-app


# Frontend
Cannot show appropriate message when we got response from server as in catch block as  I couldn't access error.response.data

Eg:When trying to login with wrong username, it shows "Request failed with status code 400" Instead of showing "Incorrect username".



Notification always keep show you need to close it manually if you don't want
I have made a method to close it after 5sec but some how it doesn't work


Browser cookies removes everytime I refresh the page so i need to use localstorage to save token value

I cannot use cookies so i need to send token manully in request body when refetching the token



docker-compose up -d --build

If you have any problem with docker-compose up you can also use your local postgres
If you use local postgres please create the table first (todoapp) 


I am little confuse Should i create new image for test or just use the same image with different table name. So for now I just use the existing table
