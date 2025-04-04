import bookingModel from "../../../DB/model/booking.model.js";

export const addBooking = async (req, res) => {
   
    try {
        const { propertyId, tenantId, startDate, endDate, paymentMethod } = req.body;
        if (!propertyId || !tenantId || !startDate || !endDate || !paymentMethod) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newBooking = new bookingModel({
            propertyId,
            tenantId,
            startDate: start,
            endDate: end,
            paymentMethod,
            status: "pending"
        });

        await newBooking.save();
        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    }
    catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};