const User = require("../database/models/User");
const bcrypt = require('bcrypt')

module.exports = {
  create: (req, res) => {
    res.render('register', {
        errors: req.flash('registrationErrors')
      }
    )
  },
  login: (req, res) => {
      res.render('login')
  },
  authenticate: (req, res) => {
      const {
          email,
          password
      } = req.body;
      // try to find the user
      User.findOne({
          email
      }, (error, user) => {
          if (user) {
              // compare passwords.
              bcrypt.compare(password, user.password, (error, same) => {
                  if (same) {
                      req.session.userId = user._id;
                      res.redirect('/')
                  } else {
                      res.redirect('/auth/login')
                  }
              })
          } else {
              return res.redirect('/auth/login')
          }
      })
  },
  store: (req, res) => {
      User.create(req.body, (error, user) => {
          if (error) {
              const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

              req.flash('registrationErrors', registrationErrors)
              return res.redirect('/auth/register');
          }
          req.session.userId = user._id;
          res.redirect('/');
      });
  },
  logout: (req, res) => {
      req.session.destroy(() => {
          res.redirect('/')
      })
  }

};
