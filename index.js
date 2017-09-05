var path = require('path');
    global.appRoot = path.resolve(__dirname);
    global.Neon = require('./neon'),
    passport = require('passport'),
    createNamespace = require('continuation-local-storage').createNamespace,
    namespace = createNamespace('com.neon');

var config = require(path.join(appRoot,'config')),
    http = require('http'),
    async = require('async'),
    //favicon = require('serve-favicon'),
    redis = require("redis").createClient(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    flash = require('connect-flash');
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    express = require('express');

var  app = express();

app.set('view engine', 'html');
app.set('view cache', false);

app.use(express.static(path.join(__dirname, config.pubPath)))
   //.use(favicon())
   .use('/neon',express.static(path.join(__dirname, 'neon/frontend')))
   .use(bodyParser.urlencoded({extended: false}))
   .use(bodyParser.json())
   .use(cookieParser())
   .use(session({
     store: new RedisStore({client: redis }),
     secret: 'Tango Down',
     cookie: { maxAge : 604800000 },
     saveUninitialized: false,
     resave: false
   }))
   .use(flash());

Neon.init(app);
