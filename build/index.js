const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path')

const FILES = [
    // 'combine-json-schema.js', // TODO: First fix relative path issue.
    'generate-element-types.js',
    // 'generate-json-schema-defaults.js', // TODO: First fix issue.
    'generate-typescript-string-integer-maps.js',
]
const COMMANDS = FILES.map(file => `node ${file}`)

async function main() {
    const cwd = path.resolve(__dirname)
    await Promise.all(
        COMMANDS.map(async command => {
            const { stderr, stdout } = await exec(command, { cwd })
            if (stderr) {
                console.warn(`Failed: ${command}`)
            } else {
                console.log(`Success: ${command}`)
            }
        })
    )
}
main()
