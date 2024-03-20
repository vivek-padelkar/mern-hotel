import Joi from 'joi'
import { validateSchema } from './validation.js'

export function signUpValidator(reqbody) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
    })
    validateSchema(reqbody, schema)
  } catch (error) {
    throw error
  }
}
