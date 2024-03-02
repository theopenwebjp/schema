const path = require("path")

const getRootDir = () => path.resolve(__dirname, '..')
const getGeneratedDir = () => path.resolve(getRootDir(), './schema/generated')

module.exports = {
    getRootDir,
    getGeneratedDir,
}