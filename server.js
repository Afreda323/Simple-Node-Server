const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//heroku port
const port = process.env.PORT || 3000;
//declare express
var app = express();

//partials
hbs.registerPartials(__dirname + '/views/partials')

//set handlebars
app.set('view engine', 'hbs');

//log usage
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log('There was an error');
    }
  })
  console.log(log);
  next();
});

//render maintenence page
app.use((req, res, next) => {
  res.render('maint.hbs');
})

//serve up static content
app.use(express.static(__dirname + '/public'));

//handlebars helper
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});
//Home route
app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcome: 'Welcome to my site',
  });
});
//About route
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page',
  });
});

//error route
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong'
  });
});

//listen to port
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
