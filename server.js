const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files (like images)
app.use(express.static('public'));

// Define a route to render the layout
app.get('/', (req, res) => {
  res.render('layouts');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
