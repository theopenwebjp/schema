const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const path = require('path')
const { getGeneratedDir } = require('../../src/build-helpers')
const { glob } = require('glob')

const GENERATED_DIR = getGeneratedDir()
const DECLARATION_DIR = path.resolve(GENERATED_DIR, 'declarations')
const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const STATE_FILE = path.resolve(__dirname, '.state.json')

/**
 * @param {string} dir
 */
async function parsePackageJSON(dir) {
    return JSON.parse(await fs.promises.readFile(path.resolve(dir, 'package.json'), { encoding: 'utf-8' }))
}

/**
 * @typedef {{ key: string; version: string }} Package
 * @typedef {{ packages: Package[] }} State
 */

class StateGetter {
    /**
     * @param {string} stateFilePath 
     */
    constructor(stateFilePath) {
        this.stateFilePath = stateFilePath
        if (!this.stateFilePath) throw new Error('File path required')
        /**
         * @type {State | null}
         */
        this.state = null
    }
    async ensureStateFile() {
        if (this.state) return this.state
        if (!fs.existsSync(this.stateFilePath)) {
            await fs.promises.writeFile(this.stateFilePath, JSON.stringify({ packages: [] }, null, 2), { encoding: 'utf-8' })
        }
        /**
         * @type {State}
         */
        const state = JSON.parse(await fs.promises.readFile(this.stateFilePath, { encoding: 'utf-8' }))
        this.state = state
        return state
    }
    /**
     * @param {string} key 
     */
    async get(key) {
        const state = await this.ensureStateFile()
        return state.packages.filter(item => item.key === key)[0]
    }
    /**
     * @param {string} key 
     * @param {string} version 
     */
    async set(key, version) {
        const state = await this.ensureStateFile()
        let item = state.packages.filter(item => item.key === key)[0]

        // Create and add new
        if (!item) {
            item = { key: '', version: '' }
            state.packages.push(item)
        }

        // Update
        item.key = key
        item.version = version

        await this.save()
    }

    async save() {
        const state = this.state
        if (!state) throw new Error('Nothing to save')
        await fs.promises.writeFile(this.stateFilePath, JSON.stringify(state, null, 2), { encoding: 'utf-8' })
    }
} 

async function main() {
    /**
     * @type {string[]}
     */
    const packageNames = Object.keys(
        (await parsePackageJSON(__dirname)).dependencies
    )

    const stateGetter = new StateGetter(STATE_FILE)

    packageNames.map(async packageName => {
        const sourceDir = path.resolve(NODE_MODULES, packageName)
        const packageJSON = await parsePackageJSON(sourceDir)
        const { version } = packageJSON
        const packageState = await stateGetter.get(packageName)
        const checked = packageState && packageState.version === version
        if (checked) return; // Ignore

        const declarationDir = path.resolve(DECLARATION_DIR, `${packageName}`)
        const SUPPORTED_EXTENSIONS = [
            '.ts', '.tsx', '.d.ts', '.js', '.jsx', '.cts', '.d.cts', '.cjs', '.mts', '.d.mts', '.mjs'
        ]
        // https://stackoverflow.com/questions/43118216/how-to-include-multiple-file-extensions-with-glob-sync-in-nodejs
        const extensionsGlobPart = SUPPORTED_EXTENSIONS.map(e => e.substring(1)).join(',')
        const globString = `${sourceDir}/**/*.{${extensionsGlobPart}}`.split('\\').join('/')
        const tscSources = [
            // glob not supported in tsc command line. // https://stackoverflow.com/questions/35734366/typescript-can-tsc-be-run-against-an-entire-folder
           ...(await glob.glob(globString)),
        ]
        const sources = tscSources.map(s => `"${s}"`).join(' ')
        // const sources = '"./node_modules/unique-selector/lib/index.js"' // DEBUG // OK
        const command = `tsc ${sources} --declaration --emitDeclarationOnly --allowJs --declarationDir "${declarationDir}"`
        // const command = 'pwd' // OK
        // console.debug('DEBUG', { globString, sources, sourceDir, packageName, version, checked, declarationDir, command }); return; // Before exec debug. OK.
        const { stdout, stderr } = await exec(command)
        if (stderr) throw new Error(stderr)
        // console.debug({ stdout }); return; // DEBUG
        await stateGetter.set(packageName, version)
    })
    
}
main()
