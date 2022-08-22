const User = require("../model/user.model");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const Otp = require("../model/otp.model");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      await User.findOne({ email: email }, (err, user) => {
        if (user) {
          if (password === user.password) {
            res.send({ message: "Login Seccesfull", user: user });
          } else {
            res.send({ message: "Password not match" });
          }
        } else {
          res.send({ message: "Use not registered" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res) => {
    try {
      console.log("scfs",req.body)
      const { name, email, password } = req.body;
      const isUserExist = await User.findOne({ email: email });
      if (!isUserExist) {
        const user = new User({ name, email, password });
        const saveNewUser = await user.save();
        res.status(200).json({message: "User is created",saveNewUser});
      } else {
        res.status(500).json("User is Already exist");
      }
    } catch (error) {
      console.log(error);
    }
  },
  forget_password: async (req, res) => {
    // console.log("email", email);
    const userData = await Otp.findOne({
      email: req.body.email
    });
    const response = {};
    if (userData) {
      let currentTime = new Date().getTime();
      let diff = userData.expireIN - currentTime;
      if (diff < 0) {
        response.message = "Token Expire";
        response.statusText = "Succes";
        response.done = "false"
      } else {
        let user = await User.findOne({ email: req.body.email });
        console.log('user', user)
        if(user){
          const updatePass = await User.findOneAndUpdate({
            email:req.body.email},
            {$set: {password:req.body.password}
          })
          console.log('updatePass', updatePass)
          response.message = "Password changed Successfully";
          response.statusText = "Success";
          response.done = 'true';
        }

      }
    } else {
      response.message = "Invalid Otp";
      response.statusText = "error";
    }
    res.status(200).json(response);
  },

  email_send: async (req, res) => {
    const { email } = req.body;
    console.log('email', email);
    let data = await User.findOne({ email: req.body.email });
    console.log('data',data);
    const responseType = {};
    if (data) {
      let otpcode = Math.floor(Math.random() * 10000 + 1);
      let otpData = new Otp({
        email: req.body.email,
        code: otpcode,
        expireIN: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = await otpData.save();
      responseType.statusText = "Success";
      await mailer(email, otpcode);
      responseType.message = "Please check your Email Id";
    } else {
      responseType.statusText = "error";
      responseType.message = "Email Id not Exits";
    }
    res.status(200).json(responseType);
  },
};

const mailer = (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  console.log(process.env.EMAIL);
  console.log(process.env.PASS);

  let mailOptions = {
    from: "kapilsharma97@gmail.com",
    to: email,
    subject: "Sending Email",
    text: `your otp is ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// ========

// forget_password: async (req, res) => {
//   try {
//     const { email } = req.body;
//     // console.log("email", email);
//     const userData = await User.findOne({ email: email, code:req.body.otpcode});
//     console.log(userData);
//     if (userData) {
//       const randomString = randomstring.generate();
//       const data = await User.updateOne(
//         { email: email },
//         { $set: { token: randomString } }
//       );
//       res.status(200).send({
//         data: data,
//         success: true,
//         msg: "Please chek mail, Reset password",
//       });
//     } else {
//       res
//         .status(200)
//         .send({ success: true, msg: "This email does not exis" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// }
