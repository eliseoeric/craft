export class Validator {
  validatorFields = []
  validatorErrors = {}
  displayNames = []
  validatorGroups = {}

  constructor(validatorModel) {
    const filtered = validatorModel.unique_fields.filter((field) =>
      field.unique_pool.includes(validatorModel.model[field.name]) // todo verify this works
    )

    const uniqueFields = filtered.map((field) => {
      return {
        name: field.name,
        value: validatorModel.model[field.name],
        validation: 'unique',
        validationValue: new RegExp(''),
        text: 'Field must be unique.',
      }
    })

    const requiredFields = validatorModel.required_fields.map((field) => {
      return {
        name: field,
        value: validatorModel.model[field],
        validation: 'required',
        validationValue: new RegExp(''),
        text: 'Field cannot be empty',
      }
    })

    const customValidationFields = validatorModel.custom_validation_fields.map((field) => {
      return {
        name: field.name,
        value: validatorModel.model[field.name],
        validation: field.validation,
        validationValue: field.value,
        text: field.text,
      }
    })

    this.validatorFields = [
      ...requiredFields,
      ...customValidationFields,
      ...uniqueFields
    ]
    
    if (validatorModel.groups) this.validatorGroups = validatorModel.groups
    if (validatorModel.display_names)
      this.displayNames = validatorModel.display_names
  }

  validate(groupsToValidate) {
    const isEmpty = (value) =>
      ['', null, undefined, 'Invalid date'].includes(value)
    let errors = {}

    this.validatorFields.forEach((field) => {
      if (groupsToValidate) {
        let group = null

        // find which group field belongs to
        for (const grp in this.validatorGroups) {
          const children = this.validatorGroups[grp]
          if (children.includes(field.name)) {
            group = grp
          }
        }

        // skip validation if not in groupsToValidate
        if (!group || !groupsToValidate.includes(group)) return
      }

      const displayName = this.displayNames[field.name]

      const errorType = {
        [field.name]: {
          error: true,
          errorMessage: field.text,
          displayMessage: displayName
            ? `${displayName}: ${field.text}`
            : `${field.name}: ${field.text}`,
        },
      }
      let isError = null

      switch (field.validation) {
        case 'required': {
          if (isEmpty(field.value)) isError = true
          break
        }
        case 'unique': {
          if (!isEmpty(field.value)) isError = true
          break
        }
        case 'regex': {
          const testRegex = (regex) => field.value.match(regex)

          if (!isEmpty(field.value) && field.validationValue) {
            if (field.validationValue === 'email') {
              const email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i
              if (!testRegex(email)) isError = true
            } else if (!testRegex(field.validationValue)) isError = true
          }
          break
        }
        case 'relationship': {
          if (field.validationValue) {
            const operator = field.validationValue[0]
            const complementName = field.validationValue.slice(1)
            const complementField = this.validatorFields.find(
              (field) => field.name === complementName
            )

            if (complementField) {
              if (operator === '>' && !(field.value > complementField.value))
                isError = true
              if (operator === '<' && !(field.value < complementField.value))
                isError = true
            }
          }
          break
        }
        case 'required_in_array': {
          if (field.value) {
            const requiredProperties = field.validationValue

            isError = field.value.some((element) =>
              requiredProperties.some((property) => isEmpty(element[property]))
            )
            break
          }
        }
      }

      if (isError) errors = { ...errors, ...errorType }
    })
    this.validatorErrors = errors
  }

  isValid(field) {
    if (this.validatorErrors && this.validatorErrors[field]) {
      return true
    }
    return false
  }

  isValidMessage(field) {
    if (this.validatorErrors && this.validatorErrors[field]) {
      return this.validatorErrors[field]?.errorMessage || ''
    }
    return ''
  }

  isGroupValid(group) {
    const fields = this.validatorGroups[group]

    for (const field of fields) {
      if (this.validatorErrors[field]) {
        return false
      }
    }
    return true
  }
}
