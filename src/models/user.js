const { Schema, model } = require("mongoose")
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")
const { pswRegex } = require("../constants")

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Set name"],
    },
    password: {
      type: String,
      minlength: 6,
      match: pswRegex,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError)

const loginSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less than 2 symbols.",
    "string.max": "The name must be not greater than 16 symbols.",
    "any.required": "The name field is required.",
  }),
  password: Joi.string().pattern(pswRegex).min(2).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.pattern.base":
      "The password must consist of at least one UpperCase, one LowerCase, and one digit from 2 to 16 symbols.",
    "string.min": "The password must be not less than 2 symbols.",
    "string.max": "The password must be not greater than 16 symbols.",
    "any.required": "The password field is required.",
  }),
})

const schemas = {
  loginSchema,
}

const User = model("user", userSchema)

module.exports = { User, schemas }
