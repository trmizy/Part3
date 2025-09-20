const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.getForgot = (req, res) => {
  res.render('forgot', { title: 'Forgot Password' });
};

exports.postRegister = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    await User.create({ username, password, email, phone });
    res.redirect('/auth/login');
  } catch (err) {
    let msg = 'Registration failed';
    if (err.code === 11000) {
      // lỗi trùng unique
      msg = 'Username or email already exists';
    } else if (err.errors) {
      // lỗi validate mongoose
      msg = Object.values(err.errors).map(e => e.message).join(', ');
    }
    res.render('register', { title: 'Register', error: msg });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      // chỉ lưu dữ liệu cần thiết
      req.session.user = { id: user._id, username: user.username };
      return res.redirect('/');
    }
    res.render('login', { title: 'Login', error: 'Invalid credentials' });
  } catch (err) {
    res.render('login', { title: 'Login', error: 'Login failed. Please try again.' });
  }
};

exports.postForgot = async (req, res) => {
  const { email } = req.body;
  // Demo: hiển thị thông báo, chưa gửi email thật
  res.render('forgot', { title: 'Forgot Password', success: `If ${email} exists, a reset link has been sent.` });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};
