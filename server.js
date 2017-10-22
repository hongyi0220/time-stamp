const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  console.log('client req\'d home page');
});

app.get('/hello', (req, res) => {
  res.send('hi!');
});

app.get('/[a-zA-Z0-9%]+', (req, res) => {
  let d;
  let formattedURI = req.url.slice(1).replace(/%20/g, ' ');
  if (/^\d+$/.test(formattedURI)) d = new Date(formattedURI * 1000); // Check if it's unix time
  else d = new Date(formattedURI);
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let unix = Date.parse(d) / 1000;
  if (d == 'Invalid Date') res.send({unix: null, natural: null});
  else {
    res.send({unix: unix, natural: getMonth(month) + " " + date + "," + " " + year});
    res.sendStatus(200);
  }
});
const getMonth = (n) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June'
                  ,'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[n];
}

app.listen(process.env.PORT);