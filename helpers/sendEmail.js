require("dotenv").config();
const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "irynamalii@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (mail) => {
  transporter
    .sendMail({ ...mail, from: "irynamalii@meta.ua" })
    .then(() => console.log("success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
