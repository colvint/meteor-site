MeteorSite.Collection = {
  editableSchema(collection) {
    var fullSchema = collection.simpleSchema().schema()
    var editableKeys = []
    _.each(fullSchema, (schema, name) => {
      if (schema.allowEdit && !schema.denyUpdate) editableKeys.push(name)
    })

    return _.pick(fullSchema, editableKeys)
  },

  permittedKeys(collection) {
    let keys = _.uniq(_.map(_.keys(this.editableSchema(collection)), (k) => { return k.split('.')[0] }))

    return keys
  },

  containsUnpermittedKeys(collection, fieldKeys) {
    var unpermittedKeys = _.difference(this.permittedKeys(collection), fieldKeys)

    return !_.isEmpty(unpermittedKeys)
  }
}
