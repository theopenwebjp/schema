const $RefParser = require('json-schema-ref-parser')
const schema = require('../schema/json-schema/index.json')
const fs = require('fs-extra')
const path = require('path')
const { getGeneratedDir } = require('../src/build-helpers')

async function combine() {
  // TODO: Issue with relative $ref files. Relative paths are relative from here instead of from the schema directory. FIX.
  const newSchema = await $RefParser.dereference(/** @type {any} */ (schema), { continueOnError: true })
  console.log('Combined schema:', newSchema)
  return newSchema
}

combine().then(newSchema => {
  return fs.writeJSON(path.join(getGeneratedDir(), 'combined-schema.json'), newSchema)
})

