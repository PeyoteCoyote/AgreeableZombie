![Landing Page](http://i67.tinypic.com/10sde1s.png)
![Dashboard](http://i68.tinypic.com/1zvrc5t.png)
![Classroom](http://i64.tinypic.com/2yvqavk.png)

## Table of Contents 

- [Technology Stack](#tech-stack)
- [Example / Usage](#example--usage)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
  - [High Level Architecture](#high-level-architecture)
- [Team Members](#team-members)

##Technology Stack
- React.js & React Router
- Node.js & Express
- PostgreSQL
- Webpack
- Socket.io
- Twilio API
- Gmail API
- Nodemailer

### Description
*Learn With Me* is an interactive application that allows users to watch screencast lessons, chat directly with the lecturer, and whiteboard their personal notes, creating the full classroom experience remotely.

##Example / Usage

Sign up for an account, and you will be up and running in no time!



##Getting Started

### Requirements
* node.js - v6.2.0
* Go to Twilio's site and follow directions at (https://www.twilio.com/docs/api/ip-messaging/guides/quickstart-js) to create a Twilio account to get SID and API keys

### Installing Dependencies

Ensure PostgresSQL installed. Create a database:
```
CREATE DATABASE classly;
```
Use the newly made database and run this query this user table:
```
CREATE TABLE students(id SERIAL PRIMARY KEY NOT NULL, firstname TEXT NOT NULL, lastname TEXT NOT NULL, email TEXT NOT NULL, stars INT NOT NULL, password TEXT NOT NULL);
```

On the server.js file be sure to change the following line to fit your username, port, and password of the database:
```
var db = pgp("postgres://danialsajjad:@127.0.0.1:5432/classly");
```

From the root directory run:
```
npm install
npm install -g nodemon webpack
webpack --watch
nodemon server.js

//visit localhost:8000 in the browser.
```

Create a .env file that includes the following: 
```
TWILIO_ACCOUNT_SID=''
TWILIO_API_KEY=''
TWILIO_API_SECRET=''
TWILIO_CONFIGURATION_SID=''
```


### Testing
Client side testing is implemented with Karma and Airbnb's Enzyme framework. Developers can pinpoint the source of their errors's using Enzyme's shallow rendering and Karma's sourcemap. Server side testing is implement with Supertest and Chai.


From the root directory run:
```
npm test
```

## Architecture
### High Level Architecture
![Architecture](http://i63.tinypic.com/2j0h92w.png)



## Team Members

### Team v2.0
Product Owner: [Rodaan Rabang](https://github.com/rodaan) 

Scrum Master: [Kent Lee](https://github.com/kqlee)

Development Team: [Dan Sajjad](https://github.com/Dansajjad), [Esther Cuan](https://github.com/esthercuan),


### Team v1.0

Product Owner: [Ashwini Jogwar](https://github.com/ashjd)

Scrum Master: [Cathy Lee](https://github.com/caathylee)

Development Team: [David Doan](https://github.com/david-doan), [Jen Wong](https://github.com/jenjwong)

"Distributed under the MIT License."
