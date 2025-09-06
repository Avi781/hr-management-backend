import Joi from 'joi';

export const attendanceSchema = Joi.object({
  employee_id: Joi.number().integer().required(),
  date: Joi.date().required(),
  check_in_time: Joi.string().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const createEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  designation: Joi.string().required(),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  salary: Joi.number().precision(2).required()
});

export const reportSchema = Joi.object({
  month: Joi.string().required(),
  employee_id: Joi.number().integer().optional()
});
