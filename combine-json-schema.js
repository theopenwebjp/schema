const $RefParser = require('json-schema-ref-parser')
const schema = require('./schema/json-schema/index.json')
const fs = require('fs-extra')
const path = require('path')

async function combine() {
  const newSchema = await $RefParser.dereference(/** @type {any} */ (schema))
  console.log('Combined schema:', newSchema)
  return newSchema
}

combine().then(newSchema => {
  return fs.writeJSON(path.join(__dirname, 'test', 'output', 'combined-schema.json'), newSchema)
})
