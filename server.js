// Express-Node-Socket.io requirements
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var pgp = require("pg-promise")();
var db = pgp("postgres://kentlee:@127.0.0.1:5432/classly");
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var router = express.Router();

//Bcrypt salting and hashing variable
var saltRounds = 10;

app.use(bodyParser.json());

// configure our server with all the middleware and routing
require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

// Setup of environment variables
require('dotenv').load();
var path = require('path');

/* Twilio Webcam Setup
Sign-up with Twilio and get keys
Load Twilio configuration from .env config file - the following environment
variables should be set:
process.env.TWILIO_ACCOUNT_SID
process.env.TWILIO_API_KEY
process.env.TWILIO_API_SECRET
process.env.TWILIO_CONFIGURATION_SID
*/

var twilio = require('twilio');
var AccessToken = twilio.AccessToken;
var ConversationsGrant = AccessToken.ConversationsGrant;
var randomUsername = require('./randos.js');

//Middleware to use express routers
router.use((req, res, next) => {
  console.log('serving request for:', req.url, ' and ', req.method);
  next();
});

//Serves up static pages
app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 8000;

//Home API page
router.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

//Triggers whenever a param route is received; calls db for user information
router.param('user_id', (req, res, next, id) => {
  db.query('SELECT * from students where id=${id}')
});

//Route when a user signs up (signup page)
router.route('/signup')
  .post((req, res) => {

    var data = req.body;
    //Check database if the email exists
    db.query('SELECT * FROM students WHERE email = ${email}', {
        email: data.email
      })
      .then((result) => {
        if (result.length === 0) {
          //Password salting and hashing
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              console.log('Error salting password', err);
            }
            bcrypt.hash(data.password, salt, (err, hash) => {
              if (err) {
                console.log('Error hashing password:', err);
              }
              //Creates a new user in our database
              db.query('INSERT INTO students (firstname, lastname, email, stars, password) VALUES (${firstName}, ${lastName}, ${email}, ${stars}, ${password})', {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  password: hash,
                  email: data.email,
                  stars: 0
                })
                .then(() => {
                  console.log('Successfully inserted user');
                  db.query('SELECT * from students WHERE email=${email}', {
                      email: data.email
                    })
                    .then((info) => {
                      res.json({
                        message: 'user created',
                        data: info
                      });
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                })
                .catch((err) => {
                  console.error('Error creating user in database');
                  res.json('database error');
                });
            });
          });
        } else {
          res.json('email already exists');
        }
      });
  });

//Route for user to sign in
router.route('/signin') //Todo: query database for unique user's settings/notes
  .post((req, res) => {
    var data = req.body;
    db.query('SELECT * FROM students WHERE email=${email}', {
        email: data.email
      })
      .then((database) => {

        if (database.length > 0) {
          //Compare hashed password with database
          bcrypt.compare(data.password, database[0].password, (err, samePW) => {
            if (err) {
              console.log('Error in comparing bcrypt passwords', err);
            }
            console.log('Matching password');
            if (samePW) {
              console.log('Match successful');
              res.json({
                response: 'match successful',
              });
            } else {
              res.json({
                response: 'invalid email/password combination'
              });
            }
          });
        } else {
          res.json({
            response: 'invalid email/password combination'
          });
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }); //Closes 'get'

//Route for images
router.route('/user/:user_id/images')
  .post((req, res) => {
    console.log(req.body);
    res.send('Image was received');
  });


//Use the router in the application
app.use('/api', router);

// Twilio token request
app.get('/token', (req, res) => {
  var identity = randomUsername();

  // Create an access token
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  //grant the access token Twilio Video capabilities
  var grant = new ConversationsGrant();
  grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

// draw history for canvas
var drawHistory = [];

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('NextButtonClick', (data) => {
    console.log('inside server');
    io.emit('next page', data);
  });
  socket.on('PrevButtonClick', (data) => {
    io.emit('prev page', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send:message', function(data) { //chatbox
    console.log('message ' + data.text);
    io.emit('send:message', {
      text: data.text
    });
  });

  //Socket Events for Canvas interactions
  for (var i in drawHistory) {
    socket.emit('drawLine', drawHistory[i]);
  }

  socket.on('drawLine', data => {
    var newLine = {
      line: data.line
    };
    drawHistory.push(newLine);
    io.emit('drawLine', newLine);
  });

  socket.on('clearCanvas', () => {
    //listen to clearCanvas
    drawHistory.length = 0;
    io.emit('clearCanvas', drawHistory);
    // empty the drawHistory and send it back to client
  });

});

server.listen(port, (err) => {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Your server is running!! Better go catch it!' + port);
});

module.exports = app;