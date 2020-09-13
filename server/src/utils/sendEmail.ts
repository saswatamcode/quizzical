import nodemailer from "nodemailer";

const sendEmail = async (to: string, html: string) => {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testaccount:", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gevvn5lrrhmug5va@ethereal.email", // generated ethereal user
      pass: "jxvVhv6MHE19zmEu6W", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: to,
    subject: "Change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export default sendEmail;
