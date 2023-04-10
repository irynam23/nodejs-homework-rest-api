const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4: uuid } = require("uuid");

const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = uuid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verificationToken });
  await newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "verify",
    html: `<a target="_blank" href="http:localhost:3000/api/users/verify/${verificationToken}">Submit</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
    verificationToken,
  });
};

module.exports = register;
