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

## Conversions

### JSDoc => TypeScript

```bash
tsc [SOURCE] --declaration --emitDeclarationOnly --allowJs
```

## Generated Schema

- Schema MAY be generated into [./schema/generated](./schema/generated).
- Schema MAY be generated either via an arbitrary build process, or via conversion.
- For conversions, use the following file hierarchy: "./schema/generated/[DESTINATION_SCHEMA_TYPE]/from_[SOURCE_SCHEMA_TYPE]/[FILENAME]"
- For arbitrary build, use the following file hierarchy: "./schema/generated/[DESTINATION_SCHEMA_TYPE]/[FILENAME]"

## Extra Documentation

- [Generate TypeScript declaration files](./build/generate-typescript-declaration-files/README.md)
