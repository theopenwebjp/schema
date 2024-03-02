const fs = require('fs-extra')
const path = require('path')
const { getGeneratedDir } = require('../src/build-helpers')

/**
* @param {number} digitCount
*/
function generateTypeScriptStringIntegerMap(digitCount) {
  /**
  * @type {Record<string, number>}
  */
  const obj = {}
  const max = Math.pow(10, digitCount) - 1
  for (let i = 0; i <= max; i++) {
    const k = `${i}`
    const v = i

    obj[k] = v
  }
  return `const StringIntegerMapWith${digitCount}Digits = ${JSON.stringify(obj, null, 2)} as const;`
}

/**
 * Builds integer maps from string integer to number integer.
 * This is mostly for TypeScript conversions between number and string for fixed numbers such as with APIs.
 * This is especially useful for constants used in APIs, etc.
 * Suitable digit counts: 1, 2, 3. Any further than this doesn't seem useful. 2 digits usually enough.
 * 
 * ※ Switching the keys and numbers is easy to do with TypeScript so is not provided here.
 */
async function build() {
  const code = [
    generateTypeScriptStringIntegerMap(1),
    generateTypeScriptStringIntegerMap(2),
    generateTypeScriptStringIntegerMap(3),
  ].map(line => {
    return `export ${line}`
  }).join('\n\n') + '\n' // End of file line feed.

  await fs.writeFile(path.resolve(getGeneratedDir(), './integer-map.ts'), code, { encoding: 'utf-8' })
}
build()
