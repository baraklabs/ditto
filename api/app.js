require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes  = require('./routes/index.js');

const app = express();
app.disable('x-powered-by');

app.use(cors()); 
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: ['text/plain', 'application/xml', 'text/xml'] }));
app.use(bodyParser.raw({ type: '*/*' })); // for catching other types

app.use('/', routes );

app.listen(PORT, () => {
  console.log(`Ditto server running on port ${PORT}`);
});
