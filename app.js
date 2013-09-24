
/**
 * Module dependencies
 */
var express = require('express'),
  routes = require('./routes'),
  tripApi = require('./routes/api/trip'),
  memberApi = require('./routes/api/member'),
  locationApi = require('./routes/api/location'),
  sessionApi = require('./routes/api/session'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

/** All environments */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

/** Simple session storage */
app.use(express.session({secret: 'tr1pJ01nBi9S3cr3t'}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/:directory/:name', routes.subpartials);

// JSON API
app.post('/api/login', sessionApi.login);
app.get('/api/session', sessionApi.authenticate, sessionApi.session);
app.get('/api/session', sessionApi.authenticate, sessionApi.logout);

app.get('/api/trips', tripApi.collection);
app.get('/api/trips/:id', tripApi.get);
app.post('/api/trips', sessionApi.authenticate, tripApi.create);
app.put('/api/trips/:id', sessionApi.authenticate, tripApi.edit);
app.delete('/api/trips/:id', sessionApi.authenticate, tripApi.delete);

app.post('/api/members', memberApi.create);
app.get('/api/members', memberApi.collection);
app.get('/api/members/:id', memberApi.get);
app.get('/api/members/:id', memberApi.edit);
app.get('/api/members/:id', memberApi.delete);

app.get('/api/members', memberApi.collection);
app.get('/api/members', memberApi.collection);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
