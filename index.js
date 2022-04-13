// Node.js ONLY

const path = require('path')
const JSDocPath = path.resolve(__dirname, 'schema', 'jsdoc', 'index.js')

const schema = {
    'JSDoc': () => JSDocPath, // Returns the path only. Use for building etc. For importing types normally, as an example use: /** @type {import('schema/jsdoc').Size} */ 
    'JSONSchema': require('./schema/json-schema/index.json')
}

module.exports = {
    schema,
    // any helpers, etc.
}
