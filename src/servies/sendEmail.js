// nodemailer 
import nodemailer from "nodemailer";
export  async function sendEmail(email,subject,massage){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "roa.alshamali@students.alquds.edu",// sender address from google app
          pass: "bhjt flwb zody uqrf",
        },
      });
      const info = await transporter.sendMail({
          from: 'rent', // sender address
          to: email, // list of receivers
          subject: subject, // Subject line
          html: massage, // html body
        });
        return info;
      
}


