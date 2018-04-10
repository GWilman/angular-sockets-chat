const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const sockets = require('./lib/sockets');
sockets.connect(server);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.plugin(require('mongoose-unique-validator'));

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port, dbURI, env } = require('./config/environment');
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI);

if('test' !== env) app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

server.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
