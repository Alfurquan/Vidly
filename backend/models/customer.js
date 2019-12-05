const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: String,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 10
  }
});

const Customer = mongoose.model("Customer", customerSchema);

validateCustomer = customer => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .required()
      .min(10)
      .max(10)
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
