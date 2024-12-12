import Joi from 'joi';

export const adminValidationSchema = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  verify: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).pattern(/^[0-9]+$/).required()
  }),

  resendCode: Joi.object({
    email: Joi.string().email().required()
  }),

  updateLanguage: Joi.object({
    language: Joi.string().valid('en', 'bn').required()
  }),

  updateTuitionStatus: Joi.object({
    status: Joi.string().valid(
      'available',
      'not_available', 
      'demo_scheduled',
      'managed_externally',
      'guardian_update_needed',
      'tutor_replacement_needed',
      'confirmed'
    ).required(),
    notes: Joi.string().max(500)
  })
};