const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME, // Use the database name from the environment variable
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('💾 MongoDB Atlas connected...');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  });

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Use secure: true in production with HTTPS
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.DB_NAME,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60, // Session expiry (14 days)
    }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

// Flash Messages
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use(
  '/user',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('./routes/user.route')
);
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./routes/admin.route')
);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running @ http://localhost:${PORT}`);
});

// Helper Functions
function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'You are not authorized to see this route');
    res.redirect('/');
  }
}

function ensureModerator(req, res, next) {
  if (req.user && req.user.role === roles.moderator) {
    next();
  } else {
    req.flash('warning', 'You are not authorized to see this route');
    res.redirect('/');
  }
}
