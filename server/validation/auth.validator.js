import Joi from 'joi'
import { validateSchema } from './validation.js'

export function signUpValidator(reqbody) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    validateSchema(reqbody, schema)
  } catch (error) {
    throw error
  }
}
export function signInValidator(reqbody) {
  try {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    validateSchema(reqbody, schema)
  } catch (error) {
    throw error
  }
}
