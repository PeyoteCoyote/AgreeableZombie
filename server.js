// Express-Node-Socket.io requirements
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var pgp = require("pg-promise")();
var db = pgp("postgres://kentlee:@127.0.0.1:5432/classly");
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var router = express.Router();

var saltRounds = 10;

app.use(bodyParser.json());

// configure our server with all the middleware and routing
require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

// connect to mongo database named "books"
mongoose.connect('mongodb://localhost/sessions');

var Schema = mongoose.Schema;

var UserSchema   = new Schema({
    name: String
});

var User = mongoose.model('Dashboard', UserSchema);

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

router.use((req, res, next) => {
  console.log('serving request for:', req.url, ' and ', req.method);
  next();
});

app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//   res.send('serving up static files!');
// });

router.get('/',(req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/user')
  .post((req, res) => {
    var data = req.body;
    db.query('INSERT INTO students (firstname, lastname, email, stars, password) VALUES (${firstName}, ${lastName}, ${email}, ${stars}, ${password})', {firstName: data.firstName, lastName: data.lastName, password: data.password, email: data.email, stars: 0})
    .then((data) => {
      console.log('Successfully inserted user');
      res.json('user created');
    })
    .catch((err) => {
      console.error('Error creating user in database');
      res.json('database error');
    });
    // Creation of user
    // var user = new User();
    // user.name = req.body.name;
    // user.save((err) => {
    //   if(err){
    //     res.send(err);
    //   }
    //   res.json({message: 'User created!'});
    // });
  })
  .get((req,res) => {
    console.log('hello');
    db.query('SELECT * FROM students')
    .then((data) => {
      console.log('GOT ALL STUDENTS:', data);
      res.json(data);
    }) 
    .catch((err) => {
      console.log('Error', err);
    });
  });

router.route('/user/:user_id')  //Todo: query database for unique user's settings/notes
  .get((req, res) => {
    console.log('REQUEST PARAMS:', req.body);
    db.query('SELECT * FROM students WHERE email=${email}', {email: 'kentqlee@gmail.com'})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  });

router.route('/user/:user_id/images')
  .post((req, res) => {
    console.log(req.body);
    res.send('Image was received');
  });


//Use the router in the application
app.use('/api', router);




//Signup page
app.post('/signup', (req, res) => {
  console.log('hallo');
  var data = req.body;
  console.log('DATA BEING RECEIVED IN POSTMAN:', data);
  //Check database if the email exists
  db.query('SELECT * FROM students WHERE email = ${email}', {email: data.email})
  .then((result) => {
    console.log('RESULT FROM EMAIL IN SERVER:', result);
    //If the user email does not exist in the database
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
          db.query('INSERT INTO students (firstname, lastname, email, stars, password) VALUES (${firstName}, ${lastName}, ${email}, ${stars}, ${password})', {firstName: data.firstName, lastName: data.lastName, password: hash, email: data.email, stars: 0})
          .then((data) => {
            console.log('Successfully inserted user');
            res.json('user created');
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
  })
  .catch((err) => {
    console.error('ERROR ON READING DATABASE:', err);
  });
});

//Signin page
app.post('/signin', (req, res) => {
  //Check the database for the email and password
  var data = req.body;
  console.log('data is:',data);
  db.query('SELECT * from students where email = ${email}', {email: data.email})
  .then((database) => {
    console.log('data found on db is:', database);
    if (database.length > 0) {
      //Compare hashed password with database
      bcrypt.compare(data.password, database[0].password, (err, samePW) => {
        if (err) {
          console.log('Error in comparing bcrypt passwords', err);
        }
        console.log('Matching password');
        if (samePW) {
          console.log('Match successful');
          res.json({response: 'match successful'});
        } else {
          res.json({response: 'invalid email/password combination'});
        }
      });
    } else {
      res.json({response: 'invalid email/password combination'});
    }
  })
  .catch((err) => {
    console.log('Error signing in', err);
  });
});

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
    console.log ('inside server');
    io.emit('next page', data);
  });
  socket.on('PrevButtonClick', (data) => {
    io.emit('prev page', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send:message', function (data) { //chatbox
    console.log('message ' + data.text);
    io.emit('send:message', {
        text: data.text
    });
  });

  //Socket Events for Canvas interactions
  for(var i in drawHistory){
    socket.emit('drawLine', drawHistory[i]);
  }

  socket.on('drawLine', data => {
    var newLine = {line: data.line};
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
