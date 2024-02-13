const Ajv = require('ajv')
// TODO: type issues: https://github.com/ajv-validator/ajv/issues/1383
const ajv = new Ajv({ useDefaults: true })
const schema = (require('./schema/json-schema/index.json')).definitions.Work
const data = {}

const validate = ajv.compile(schema)

console.log(validate(data))
console.log(data)
