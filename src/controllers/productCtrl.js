const { Types } = require("mongoose")
const moment = require("moment")
const cloudinary = require("cloudinary").v2
const { Product } = require("../models/product")
const { User } = require("../models/user")

require("dotenv").config()

const {
  ctrlWrapper,
  HttpError,
  objForSearch,
  transformNotice,
  transformMinifiedNotice,
  transformNoticeExtended,
  extractPublicId,
} = require("../helpers")
const { noticeCategories } = require("../constants")
