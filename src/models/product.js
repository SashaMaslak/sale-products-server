const { Schema, model } = require("mongoose")
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")

const productSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 24,
      required: [true, "Set a name for the product"],
    },
    category: {
      type: String,
      required: [true, "Set a category for the product"],
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      min: 1,
      required: [true, "Set a price for the product"],
    },
    quantity: {
      type: Number,
      required: [true, "Set a quantity for the product"],
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
)

productSchema.post("save", handleMongooseError)

/**
 * Схеми Joi (addProductSchema)
 */

const addProductSchema = Joi.object({
  // *-* name *-*
  name: Joi.string().min(2).max(24).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less than 2 symbols.",
    "string.max": "The name must be not greater than 24 symbols.",
    "any.required": "The name field is required.",
  }),

  // *-* category *-*
  category: Joi.string().required().messages({
    "string.base": "The category must be a string.",
    "any.required": "The name field is required.",
  }),

  // *-* price *-*
  price: Joi.number().min(1).required().messages({
    "number.base": "The price must be a number.",
    "number.min": "The price must be not less than 1.",
    "any.required": "The price field is required.",
  }),

  // *-* quantity *-*
  quantity: Joi.number().messages({
    "number.base": "The price must be a number.",
  }),

  // *-* description *-*
  description: Joi.string().max(500).messages({
    "string.base": "The description must be a string.",
    "string.max": "The type must be not greater than 500 symbols.",
  }),

  // *-* image *-*
  image: Joi.string().max(500).messages({
    "string.base": "The image must be a string.",
    "string.max": "The type must be not greater than 500 symbols.",
  }),

  // *-* creator *-*
  creator: Joi.string().max(32).messages({
    "string.base": "The creator must be a string.",
    "string.max": "The type must be not greater than 32 symbols.",
  }),
})

// *-* Parameter schemas *-*
const paramsProductSchema = Joi.object({
  page: Joi.number().min(0).messages({
    "number.base": "The page must be a number.",
    "number.min": "The page must be not less than 0.",
  }),
  limit: Joi.number().min(0).max(36).messages({
    "number.base": "The limit must be a number.",
    "number.min": "The limit must be not less than 0.",
    "number.max": "The limit must be not greater than 36.",
  }),
  category: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  query: Joi.string().max(48).messages({
    "string.base": "The query must be a string.",
    "string.max": "The query must be not greater than 48 symbols.",
  }),
})

const schemas = {
  addProductSchema,
  paramsProductSchema,
}

const Product = model("product", productSchema)

module.exports = { Product, schemas }
