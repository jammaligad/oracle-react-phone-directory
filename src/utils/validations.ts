const REGEX = {
  ALPHABETS_AND_SPACE_ONLY: /(^(?!'))([a-zA-ZäöüÄÖÜß'\- ]+$)/m,
  NUMBERS_ONLY: /\/^d+$\//,
  EMAIL: /^[a-zA-Z][a-zA-Z0-9.]{1,9}@[a-zA-Z]{2,20}[.][a-zA-Z]{2,10}$/
}

const nameValidation = (value: string) => {
  if (!value?.length) {
    return 'The field is required.'
  }

  if (!REGEX.ALPHABETS_AND_SPACE_ONLY.test(value)) {
    return 'It should contain only Alphabets and Space.'
  }

  if (value.length > 20) {
    return 'It should be less than or equal to 20 characters in length.'
  }

  return undefined
}

const phoneValidation = (value: string) => {
  if (!value?.length) {
    return 'The field is required.'
  }

  if (isNaN(parseInt(value))) {
    return 'It should contain only Numbers.'
  }

  if (value.length !== 10) {
    return 'It should be equal to 10 characters in length.'
  }

  return undefined
}

const emailValidation = (value: string) => {
  if (!value?.length) {
    return 'The field is required.'
  }

  if (!REGEX.EMAIL.test(value)) {
    return 'Invalid email format.'
  }

  return undefined
}

const VALIDATIONS: { [key: string]: (value: string) => string | undefined } = {
  name: nameValidation,
  phone: phoneValidation,
  email: emailValidation
}

export const validateField = (fieldName: string, value: string) => {
  if (!VALIDATIONS[fieldName]) {
    return undefined
  }

  return VALIDATIONS[fieldName](value)
}
