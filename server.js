const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const path = require('path');


// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({ //Initialize the Sequalize store
  //   db: sequelize,
  // }),
};

app.use(session(sess));



// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files (like images)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
