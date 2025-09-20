const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  const ONE_HOUR = 1000 * 60 * 60;

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      httpOnly: true,
      maxAge: ONE_HOUR
    },
    name: 'connect.sid' // cookie phiên (mặc định)
  }));

  // Optional: đặt thêm cookie phụ 'sid' để bạn "thấy cả hai" (theo nhu cầu trước đó)
  app.use((req, res, next) => {
    if (req.session.user) {
      res.cookie('sid', req.session.id, { httpOnly: false, maxAge: 1000 * 60 * 30 });
    } else {
      res.clearCookie('sid');
    }
    next();
  });

  // Expose user cho mọi view
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });
};
