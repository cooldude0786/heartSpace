const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;
const ipAddress = process.env.IP_ADDRESS || 'localhost';

const routes = require('./route/routes.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',routes)

app.listen(port, ipAddress, () => {
  console.log(`Server is listening at http://${ipAddress}:${port}`);
});



