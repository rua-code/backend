
import bookingModel from "../../../DB/model/booking.model.js";
import propertyModel from "../../../DB/model/property.model.js";

export const addBooking = async (req, res) => {

    try {
        const tenantId = req.id
        // contenanIDsole.log(tenantId)
        const { propertyId } = req.params
        const { startDate, endDate, paymentMethod, price } = req.body;
        if (!startDate || !endDate || !paymentMethod || !price) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const property = await propertyModel.findById(propertyId)
        if (!property) {
            return res.status(400).json({ message: "property not found" });
        }
        const start = new Date(startDate)
        const end = new Date(endDate)

        //start يسبق ال end start<end
        if (start >= end) {
            return res.status(400).json({ message: "start date must be before end date" });
        }
        //تاريخ الستارت لاوم يكون بعد تاريخ اليوم او مساوي
        if (start < new Date()) {
            return res.status(400).json({ message: "start date must be after today date" });
        }
        const booking = await bookingModel.find({ propertyId, status: { $in: ["pending", "approved"] }, startDate: { $lte: end }, endDate: { $gte: start } })
        if (booking.length > 0) {
            return res.status(400).json({ message: "its booked" });
        }

        console.log(end)
        const newbooking = await bookingModel.create({
            propertyId,
            tenantId,
            startDate: start,
            paymentMethod,
            price,
            endDate: end
        })

        // const newBooking = new bookingModel({
        //     propertyId,
        //     tenantId,
        //     startDate:start,
        //     endDate:end,
        //     paymentMethod,
        //     price,
        // });

        // await newBooking.save();
        return res.status(201).json({ message: "Booking created successfully", booking: newbooking });
    }
    catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params
        const tenantId=req.id
        const { startDate, endDate, paymentMethod, price } = req.body;
        const bookingID = await bookingModel.findById(bookingId);
        if (!bookingID) {
            return res.status(400).json({ message: "booking id not found" });
        }
        if (tenantId !=bookingID.tenantId) {
            return res.status(400).json({ message: "you are not tenant" });
        }


        const start = new Date(startDate)
        const end = new Date(endDate)


        if (start >= end) {
            return res.status(400).json({ message: "start date must be before end date" });
        }

        if (start < new Date()) {
            return res.status(400).json({ message: "start date must be after today date" });
        }
        const propertyId = bookingID.propertyId

        const booking = await bookingModel.find({_id:{$ne:bookingId},propertyId:propertyId, status: { $in: ["pending", "approved"] }, startDate: { $lte: end }, endDate: { $gte: start } })
        if (booking.length > 0) {
            return res.status(400).json({ message: "its booked" });
        }
        if (startDate) {
            bookingID.startDate = start
        }
        if (endDate) {
            bookingID.endDate = end
        }
        if (price) {
            bookingID.price = price
        }
        if (paymentMethod) {
            bookingID.paymentMethod = paymentMethod
        }
        await bookingID.save()
        return res.status(400).json({ message: "success" });
        
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}
// المفروض كمان نعمل لطلب الاستئجار

//تعديل حالة حجز من قبل صاحب العقار س status

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const ownerId = req.id;
        const { status } = req.body;

        // تحقق من وجود الحجز
        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // جلب العقار المرتبط بالحجز
        const property = await propertyModel.findById(booking.propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // التحقق إن المستخدم هو صاحب العقار
        if (property.ownerId.toString() !== ownerId) {
            return res.status(403).json({ message: "You are not the owner of this property" });
        }

        // تحقق من أن الحالة المرسلة صالحة
        const validStatuses = ["pending", "approved", "completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid booking status" });
        }

        // تعديل الحالة
        booking.status = status;
        await booking.save();

        return res.status(200).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};


export const getAllBookingsForOwner = async (req, res) => {
    try {
        const ownerId = req.id;

        // جيب كل العقارات يلي إنت مالكها
        const properties = await propertyModel.find({ ownerId });

        // طلع بس ال IDs تبع العقارات
        const propertyIds = properties.map(p => p._id);

        // جيب الحجوزات اللي لها علاقة بالعقارات تبعتك
        const bookings = await bookingModel.find({ propertyId: { $in: propertyIds } });

        res.json({ bookings });

    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

/// الحجوزات الخاصة لصاحب عقار معين 