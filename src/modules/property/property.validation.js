import Joi from "joi";
import validation from "../../Middleware/validation.js";

export const addPropertySchema = Joi.object({
    lng: Joi.number().required().messages({
        "any.required": "Longitude is required",
        "number.base": "Longitude must be a number"
    }),
    lat: Joi.number().required().messages({
        "any.required": "Latitude is required",
        "number.base": "Latitude must be a number"
    }),
    price: Joi.number().positive().required().messages({
        "any.required": "Price is required",
        "number.base": "Price must be a number",
        "number.positive": "Price must be a positive number"
    }),
    address: Joi.string().min(5).max(100).required().messages({
        "any.required": "Address is required",
        "string.min": "Address must be at least 5 characters",
        "string.max": "Address must be less than 100 characters"
    }),
    propertyType: Joi.string().valid("apartment", "house", "villa", "studio").required().messages({
        "any.required": "Property type is required",
        "any.only": "Property type must be one of: apartment, house, villa, studio"
    }),
    area: Joi.number().positive().required().messages({
        "any.required": "Area is required",
        "number.base": "Area must be a number",
        "number.positive": "Area must be a positive number"
    }),
    numberRoom: Joi.number().integer().min(1).required().messages({
        "any.required": "Number of rooms is required",
        "number.base": "Number of rooms must be a number",
        "number.integer": "Number of rooms must be an integer",
        "number.min": "There must be at least one room"
    }),
    title: Joi.string().min(3).max(50).required().messages({
        "any.required": "Title is required",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 50 characters"
    }),
    note:Joi.string().min(3).max(100).optional().messages({
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 50 characters"
    })
});


export const updatePropertySchema = Joi.object({
    title: Joi.string().min(3).max(50).optional().messages({
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 50 characters"
    }),
    price: Joi.number().positive().optional().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be a positive number"
    })
});

// في ريكوست لل uploud  والادمن بغير حالة الطلب 