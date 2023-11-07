const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const sendVerifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'josephfrancizz555@gmail.com',
        pass: 'tewfsbnpaqtuekgr'
      }
    });

    const mailOptions = {
      from: 'josephfrancizz555@gmail.com',
      to: email,
      subject: 'For Verification mail',
      html: '<p>Hyy ' + name + ', please click here to <a href="http://127.0.0.1:3000/verify?id=' + user_id + '"> Verify </a> your mail.</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render('registration');
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const s_password = await securePassword(req.body.password);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      image: req.file.filename,
      password: s_password,
      is_admin: 0
    });

    const userData = await newUser.save();

    if (userData) {
      sendVerifyMail(req.body.name, req.body.email, userData._id);
      return res.render("registration", {
        message: "Your registration has been successful, Please verify your mail."
      });
    } else {
      return res.render("registration", {
        message: "Your registration has failed"
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.render("registration", {
      message: "An error occurred during registration"
    });
  }
};

const verifyMail = async (req, res) => {
  try {
    const updateInfo = await userModel.updateOne({ _id: req.query.id }, { $set: { is_verified: 1 } });
    console.log(updateInfo);
    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

const loginLoad = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await userModel.findOne({ email: email });

    if (userData) {
      if (password === userData.password) {
        if (userData.is_verified === 0) {
          res.render('login', { message: "Please verify your mail." });
        } else {
          req.session.user_id = userData._id;
          res.redirect('/home');
        }
      } else {
        res.render('login', { message: "Email and password are incorrect" });
      }
    } else {
      res.render('login', { message: "Email and password are incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.session.user_id });
    res.render('home', { user: userData });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
};

const verificationLoad = async (req, res) => {
  try {
    res.render('verification');
  } catch (error) {
    console.log(error.message);
  }
};

const sentVerificationLink = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await userModel.findOne({ email: email });

    if (userData) {
      sendVerifyMail(userData.name, userData.email, userData._id);
      res.render('verification', { message: "Reset verification mail sent to your email. Please check." });
    } else {
      res.render('verification', { message: "This email does not exist." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  verifyMail,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  verificationLoad,
  sentVerificationLink
};
