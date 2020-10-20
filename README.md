# Luke Warm Beans - UImpactify

An e-learning platform providing credible and relevant courses that teach valuable skills to all people in the social work ecosystem. This platform should bring together educators, students, and organizations in one community, improving the general quality of work in the ecosystem while reducing the financial burden on organizations and individuals.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Frontend: Some recent version of node.js
Backend: Python3, flask, monogodb

## Frontend

Install dependencies and run the app in development mode
```
$ cd frontend
$ npm install
$ npm start
```

See additional information in /frontend/frontend.md

## Backend

### Mongo Installation (Windows)

Install the latest version of mongoDB community version here: https://www.mongodb.com/download-center/community and accept all default configuration. 

Let `mongo` represent the path to where you installed mongo.exe, ie `C:\"Program Files"\MongoDB\Server\4.4\bin\mongo.exe`. Similarly, `mongod` represents the path to `mongod.exe`.


Create the directory your local data will be stored:

```
$ md \data\db
```

Launch the database server:

```
$ mongod
```

Launch mongo shell

```
$ mongo
```

Set up authentication for the database

```
> use admin
> db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
> db.adminCommand( { shutdown: 1 } )
```

Now you can run the database in authentication mode and log in as admin

```
$ mongod --auth
$ mongo localhost:27017/admin -u admin -p password
```


### Flask Installation (Windows)

Create virtual environment
```
$ cd backend
$ py -3 -m venv venv
```

Activate the environment and install dependencies

```
$ venv\Scripts\activate
$ pip install -r requirements.txt
```

If you're getting an error when installing the flask-mongoengine you may have to run:

```
$ pip install wheel
$ pip install -r requirements.txt
```

Run the development server 

*MAKE SURE YOU DO NOT USE POWERSHELL IT HAS A DIFFERENT SYNTAX FOR SETTING VARIABLES*

```
$ set FLASK_APP=uimpactify
$ set FLASK_ENV=development
$ flask run
```

## Additional commands
Run these commands in a seperate tab while the flask server is running

To generate test data on the database (currently just creates an admin user)

```
$ flask init-db
```

To test out logging in through the api and making authorized requests (while the dev server is running...)

```
$ flask login
```

### Adding a new python dependency

If you add a new dependency to the python environment, make sure to update requirements.txt

```
$ pip freeze > .\requirements.txt
```


- Access endpoints using Postman for testing

- follow https://towardsdatascience.com/creating-a-beautiful-web-api-in-python-6415a40789af to get 
a better understanding of how the backend operates

