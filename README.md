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
(venv) $ pip install -r requirements.txt
```

If you're getting an error when installing the flask-mongoengine you may have to run:

```
(venv) $ pip install wheel
(venv) $ pip install -r requirements.txt
```

Run the development server 

*MAKE SURE YOU DO NOT USE POWERSHELL IT HAS A DIFFERENT SYNTAX FOR SETTING VARIABLES*

```
(venv) $ set FLASK_APP=uimpactify
(venv) $ set FLASK_ENV=development
(venv) $ flask run
```

### Mongo Installation (Mac OS)

Follow the official MongoDB installation manual to install MongoDB here:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition

(Assuming you are using MacOS Catalina with zsh in which the root folder is no longer writable)
Create the directory your local data will be stored:

```
$ cd /Users/<your mac username>
$ mkdir -p /data/db
```

Open the MongoDB config file:

```
$ open /usr/local/etc/mongod.conf
```

Change the dbPath to the directory that was just created:

```
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /Users/<your mac username>/data/db
net:
  bindIp: 127.0.0.1 
```

Save the file and Launch the database server with brew:

```
$ brew services start mongodb-community@4.4
```

Or alternatively Run MongoDB manually as a background process:

```
$ mongod --config /usr/local/etc/mongod.conf --fork
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
Reference: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition

### Flask Installation (Mac OS)

Create virtual environment
```
$ cd backend
$ python3 -m venv venv
```

Activate the environment and install dependencies

```
$ source venv/bin/activate
(venv) $ pip install -r requirements.txt
```

If you're getting an error when installing the flask-mongoengine you may have to run:

```
(venv) $ pip install wheel
(venv) $ pip install -r requirements.txt
```

Run the development server 

```
(venv) $ export FLASK_APP=uimpactify
(venv) $ export FLASK_ENV=development
(venv) $ flask run
```

Reference: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world/page/6

## Additional commands
Run these commands in a seperate tab while the flask server and MongoDB server are running

To generate test data on the database (currently just creates an admin user)

```
(venv) $ flask init-db
```

To test out logging in through the api and making authorized requests (while the dev server is running...)

```
(venv) $ flask login
```

### Adding a new python dependency

If you add a new dependency to the python environment, make sure to update requirements.txt

```
$ pip freeze > .\requirements.txt
```


- Access endpoints using Postman for testing

- follow https://towardsdatascience.com/creating-a-beautiful-web-api-in-python-6415a40789af to get 
a better understanding of how the backend operates

