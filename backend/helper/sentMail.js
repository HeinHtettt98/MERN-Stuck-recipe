const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sentMail = async ({ file, data, from, to, subject }) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWO,
      },
    });
    let dataString = await ejs.renderFile("./views/" + file + ".ejs", data);

    const info = await transport.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      html: dataString, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(e);
  }
};
module.exports = sentMail;
