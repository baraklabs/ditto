const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');

const routes  = require('./routes/index.js');


const cors = require('cors');

const app = express();
app.disable('x-powered-by');

app.use(cors()); 
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(xmlparser());
app.use(bodyParser.raw({ type: '*/*' }));


app.use('/', routes );


app.listen(PORT, () => {
  console.log(`Ditto server running on port ${PORT}`);
});