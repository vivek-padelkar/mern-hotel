export const validateSchema = (input, schema) => {
  try {
    const { error } = schema.validate(input)
    if (error)
      throw error.details
        ? 'Schema validation: ' + error.details[0].message
        : ''
    else return false
  } catch (error) {
    throw error
  }
}
