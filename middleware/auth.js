module.exports = function requireLogin(req, res, next) {
  if (req.session && req.session.user && req.session.user.id) {
    return next();
  }

  // Nếu là request API thì trả về JSON
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Còn lại thì redirect về trang login
  res.redirect('/auth/login');
};
