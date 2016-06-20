AddressSchema = new SimpleSchema({
  street: {
    type: String,
    allowEdit: true,
    optional: true,
    max: 100
  },

  city: {
    type: String,
    allowEdit: true,
    optional: true,
    max: 50
  },

  state: {
    type: String,
    allowEdit: true,
    optional: true,
    max: 2
  },

  zip: {
    type: String,
    allowEdit: true,
    optional: true,
    regEx: SimpleSchema.RegEx.ZipCode,
  }
})

PhoneSchema = new SimpleSchema({
  number: {
    type: String,
    allowEdit: true,
    regEx: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    optional: true,
  },

  kind: {
    type: String,
    allowEdit: true,
    allowedValues: ['home', 'mobile', 'work', 'fax'],
    optional: true,
  }
})

ContactSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'email',
    allowEdit: true,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },

  firstName: {
    type: String,
    label: 'first name',
    optional: true,
    allowFilter: true,
    allowEdit: true,
  },

  middleName: {
    type: String,
    label: 'middle name',
    allowEdit: true,
    optional: true,
  },

  lastName: {
    type: String,
    label: 'last name',
    optional: true,
    allowFilter: true,
    allowEdit: true,
  },

  phone: {
    type: PhoneSchema,
    defaultValue: {},
    optional: true,
  },

  address: {
    type: AddressSchema,
    defaultValue: {},
    optional: true,
  },

  dateOfBirth: {
    type: Date,
    label: 'date of birth',
    allowEdit: true,
    optional: true,
  },

  gender: {
    type: String,
    label: 'gender',
    allowedValues: ['Male', 'Female'],
    allowEdit: true,
    optional: true,
  },

  ethnicity: {
    type: [String],
    label: 'ethnicity',
    allowEdit: true,
    allowedValues: [
      'Asian',
      'Indian',
      'Black',
      'Pacific',
      'White',
      'Hispanic',
    ],
    optional: true,
  },

  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },

  bio: {
    type: String,
    allowEdit: true,
    optional: true,
  },
})

Contactable = {
  label(contactable) {
    const contact = contactable.contact

    return `${contact.lastName}, ${contact.firstName}`
  }
}
