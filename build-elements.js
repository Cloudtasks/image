const fs = require('fs-extra')
const concat = require('concat')
;(async function build() {
  const files = [
    './dist/cloudtasks/runtime-es2015.js',
    './dist/cloudtasks/polyfills-es2015.js',
    './dist/cloudtasks/scripts.js',
    './dist/cloudtasks/main-es2015.js'
  ]
  await fs.ensureDir('public')
  await concat(files, 'public/cloudtasks-image.js')
  await fs.copyFile('./public/cloudtasks-image.js', 'dist/cloudtasks-image.js')
})()
;(async function build() {
  const files = [
    './dist/cloudtasks/runtime-es5.js',
    './dist/cloudtasks/polyfills-es5.js',
    './dist/cloudtasks/scripts.js',
    './dist/cloudtasks/main-es5.js'
  ]
  await fs.ensureDir('public')
  await concat(files, 'public/cloudtasks-image.legacy.js')
  await fs.copyFile('./public/cloudtasks-image.legacy.js', 'dist/cloudtasks-image.legacy.js')
})()
