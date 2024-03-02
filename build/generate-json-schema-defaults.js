const Ajv = require('ajv')
const { writeJSON } = require('fs-extra')
const path = require('path')
const { getGeneratedDir } = require('../src/build-helpers')

async function main() {
    // TODO: type issues: https://github.com/ajv-validator/ajv/issues/1383
    const ajv = new Ajv({ useDefaults: true })
    /*
    TODO:

    stderr: 'strict mode: missing type "object" for keyword "properties" at "#" (strictTypes)\n'

    MissingRefError: can't resolve reference #/definitions/CommonHistory from id #\r\n"
    */
    const schema = (require('../schema/json-schema/index.json')).definitions.Work
    const data = {}

    const validate = ajv.compile(schema)

    console.log(validate(data))
    console.log(data)

    await writeJSON(path.resolve(getGeneratedDir(), './default-schema-data.json'), data)
}
main()
