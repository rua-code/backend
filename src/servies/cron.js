//cron => جدولة مهام بحالتي كل يوم ع الساعد 12
//no req no res

import bookingModel from "../../DB/model/booking.model.js";
import cron from "node-cron"
import { sendEmail } from "./sendEmail.js";

cron.schedule ("0 0 * * * ",async ()=>  {
  const  todayDate = new Date();

  // search in booking model under two conditions 1- status ="approved" 2- enddate id less than todayDate بعدها برجعها ب var 2
  
  const expiredBookings= await bookingModel.find({
      status :"approved",
      endDate:{$lt :todayDate}
  }).populate('tenantId', 'email firstName');
  
  //3 if expiredBookings length = 0 then i don't have bookings return consle.log 
  if (expiredBookings.length === 0) {
      console.log("No expired bookings found.");
      return;// بس عشان يطلع من الفنكشن 
    }
     //4  if there is bookings  > for( const booking of expiredBookings) {send email for them }
     for (const booking of expiredBookings) {
      const tenantEmail = booking.tenantId.email;
      const tenantName = booking.tenantId.firstName;
  
      const subject = "RENT.PS";
      const message = `<p>Hello ${tenantName},</p><p>Your booking has expired on ${booking.endDate.toDateString()}.</p>`;
  
        await sendEmail(tenantEmail, subject, message);
     }
  
     //5 update booking status
   const updateBooking = await bookingModel.updateMany(
      {
        status: "approved",
        endDate: { $lt: todayDate }
      },
      {
        $set: { status: "completed" }
      }
    );
    
    console.log(updateBooking);
})
//newDate=> todayDate 1


