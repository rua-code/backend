// nodemailer 
import nodemailer from "nodemailer";
export  async function sendEmail(){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "roa@gmail,com",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
      const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: "rua", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<h2> hi</h2>", // html body
        });
      
}

