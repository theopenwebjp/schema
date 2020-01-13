const schema = {
    'custom-json-ld': require('./schema/custom-json-ld/index.json'),
    'json-schema': require('./schema/json-schema/index.json')
}

const all = Object.assign(schema['custom-json-ld'], schema['json-schema'])

const Schema = Object.assign({
        all: all
    },
    schema,
    all
)

// TODO: Merge directories into nested object and all.

if (typeof module === 'object') {
    module.exports = Schema
}