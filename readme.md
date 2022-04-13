# Description

A collection of schema.
Currently, no specific grouping.

## Example

Add any examples to the example directory.

## Format

Schema are to the schema directory.
The following schema are allowed:

- jsdoc
- json-schema
- json-ld
- typescript
- webidl

- [https://json-ld.org/](Official JSON LD site)
- [https://en.wikipedia.org/wiki/JSON-LD](JSON LD Wikipedia)

## Usage

Install:

```bash
npm install @theopenweb/schema
```

If using Node.js and want perform builds, any utility functions are provided in the main index.js file.

### JSDoc

```js
/**
 *  @type {import('schema/jsdoc').Size}
 */
```

### JSONSchema

```js
// First convert to typescript
// CLI
// https://github.com/bcherny/json-schema-to-typescript#cli
// json2ts ./node_modules/schema/json-schema/index.json > schema.d.ts

/**
 * @type {import('schema.d.ts').definitions.Work}
 */

```

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "definitions": {
    "MyType": {
        "$ref": "language-scripts.json#definitions/scripts"
    }
  }
}
```

## Typing

[https://www.w3.org/TR/json-ld/#typed-values](Typing)

## Languages

[https://www.w3.org/TR/json-ld/#string-internationalization](Internationalization)
